@extends('layouts.main')
@section('content')

@section('custom_css')	
<style type="text/css">
	
	.box-body{
		margin-left: 300px;
	}
	.title-title h4{
		text-align: center;
		margin-top: 90px;
		margin-left: 1px;
	}
</style>
@endsection

@section('content')

	<div class="box-body">
	<div class="title-title">
		<h4 class="mb-3 line-head d-flex justify-content-between">Listado de Medicamentos
			<a type="button" href="#" class="btn btn-sm btn-success" data-toggle="modal" data-target="#updMedicamento" data-toggle="tooltip" title="Registrar Medico">
				<i class="fa fa-plus"></i>Registrar Medicamento
			</a>
		</h4>
	</div>

	<div id="msj-delete" class="alert alert-danger" role="alert" style="display: none;">
		<strong>Se Elimino Correctamente!!!</strong>
	</div>

    <div id="message-update" class="alert alert-info" style="display: none">
        <strong>Se Actualizo Correctamente!!!</strong>
    </div>

	<div id="msj-save" class="alert alert-info" role="alert" style="display: none;">
		<strong>Datos Guardados Exitosamente!!!</strong>
	</div>

		<div class="tile-body">
			<div id="list"></div>
		</div>
	</div>
	
	@include('medicamentos.create')
	@include('medicamentos.edit')

@endsection

@section('custom_js')

<script type="text/javascript">
	
	$(document).ready(function(){
		medicina();
	});

	const medicina = function(){
		$.ajax({
			type:'get',
			url:"{{ url('medicamentos/mostrar') }}",
			success: function(data){
				$("#list").empty().html(data);
			}
		});
	}

	const salvar = function(){

		event.preventDefault();
		const nombre = $("#nombre").val();
		const route = "{{ url('medicamentos/store') }}";
		const token = $("#token").val();
		
		$.ajax({
			url:route,
			headers:{'X-CSRF-TOKEN':token},
			type:'post',
			dataType:'json',
			data:{nombre:nombre},
			success:function(data){
				if (data.success == 'true') {
					medicina();
					$("#updMedicamento").modal("toggle");
					$("#msj-save").fadeIn();
					$("#msj-save").show().delay(3000).fadeOut(1);	
				}
			},
			error:function(data){
				const validacion = data.responseJSON.errors;
				if (validacion.hasOwnProperty('nombre')) {
					$("#msj-validacion").empty().html(data.responseJSON.errors.nombre[0]);
				}
				$("#msj-error").fadeIn();
			}
		});
	}

	const muestreo = function(id){
		const route = "{{ url('medicamentos') }}/"+id+"/edit";
		$.get(route,function(data){
			$("#id_medicina").val(data.id);
			$("#nombre_medicina").val(data.nombre);
		});
	}

	const act = function(){

		const id = $("#id_medicina").val();
		const nombre_medicina = $("#nombre_medicina").val();
		const token = $("#token").val();
		const route = "{{ url('medicamentos') }}/"+id+"/update";

		$.ajax({
			url:route,
			headers: {'X-CSRF-TOKEN':token},
			type:'PUT',
			dataType:'json',
			data: {nombre_medicina:nombre_medicina},
			success: function(data){
				if (data.success == 'true') {
					medicina();
					$("#editMedicina").modal("toggle");
					$("#message-update").fadeIn();
					$("#message-update").show().delay(3000).fadeOut(1);
				}
			},
			error:function(data){
				const validation = data.responseJSON.errors;
				if (validation.hasOwnProperty('nombre_medicina')) {
					$("#msj-validation").empty().html(data.responseJSON.errors.nombre_medicina[0]);
				}
				$("#msj-error-error").fadeIn();
			}
		});
	}

	const eliminar = function(id,nombre){

		const question = confirm("¿Estas seguro de borrar: "+nombre+" de la lista?");
		const route = "{{ url('medicamentos') }}/"+id+"/eliminar";
		const token = $("#token").val();

		if (question == true) {
			$.ajax({

				url:route,
				headers:{'X-CSRF-TOKEN':token},
				type:'delete',
				dataType:'json',
				success:function(data){
					if (data.success == 'true') {
						medicina();
						$("#msj-delete").fadeIn();
						$("#msj-delete").show().delay(3000).fadeOut(1);		
					}else{
						alert("ERROR");
					}
				}
			});			
		}

	}

</script>

@endsection