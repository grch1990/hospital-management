@extends('layouts.main')
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
		<h4 class="mb-3 line-head d-flex justify-content-between">Listado de Medicos
			<a type="button" href="#" class="btn btn-sm btn-success" data-toggle="modal" data-target="#ventana" data-toggle="tooltip" title="Registrar Medico">
				<i class="fa fa-plus"></i>Registrar Medico
			</a>
		</h4>
	</div>

	<div id="eliminado" class="alert alert-danger" role="alert" style="display: none;">
		<strong>Se Elimino Correctamente!!!</strong>
	</div>

    <div id="datos_act" class="alert alert-info" style="display: none">
        <strong>Datos Actualizados Correctamente!!!</strong>
    </div>

	<div id="datos_guardados" class="alert alert-info" role="alert" style="display: none;">
		<strong>Datos Guardados Exitosamente!!!</strong>
	</div>

		<div class="tile-body">
			<div id="med-list"></div>
		</div>
	</div>

	@include('medicos.ventana')
	@include('medicos.editar')

@endsection

@section('custom_js')
<script type="text/javascript">

	$(document).ready(function(){
		medico_listado();
	});

	const medico_listado = function(){
		$.ajax({
			type:'get',
			url:"{{url('medico/listado')}}",
			success:function(data){
				$("#med-list").empty().html(data);
			}
		})
	}

	const grd = function(){

		const name_medico = $("#name_medico").val();
		const apellido_medico = $("#apellido_medico").val();
		const token = $("#token").val();
		const route = "{{ url('medico/store') }}";

		$.ajax({
			url:route,
			headers:{'X-CSRF-TOKEN':token},
			type:'post',
			dataType:'json',
			data:{name_medico:name_medico,
				apellido_medico:apellido_medico},
			success:function(data){
				if (data.success == 'true') {
					medico_listado();
					$("#ventana").modal("toggle");
					$("#datos_guardados").fadeIn();
					$("#datos_guardados").show().delay(3000).fadeOut(1);	
				}
			},
			error:function(data){
				const validations = data.responseJSON.errors;
				if (validations.hasOwnProperty('name_medico') && validations.hasOwnProperty('apellido_medico')) {
					$("#m-validation-name").empty().html(data.responseJSON.errors.name_medico);
					$("#m-validation-apellido").html(data.responseJSON.errors.apellido_medico);
					$("#m-show-apellido").fadeIn();
					$("#m-show-name").fadeIn();
				}else if (validations.hasOwnProperty('apellido_medico')) {
					$("#m-validation-apellido").empty().html(data.responseJSON.errors.apellido_medico[0]);
					$("#m-show-apellido").fadeIn();
				}else if (validations.hasOwnProperty('name_medico')) {
					$("#m-validation-name").empty().html(data.responseJSON.errors.name_medico[0]);
					$("#m-show-name").fadeIn();
				}
			}
		});
	}

	const show = function(id){
		const route = "{{ url('medico') }}/"+id+"/show";
		$.get(route,function(data){
			$("#id").val(data.id);
			$("#medico_nombre").val(data.nombres);
			$("#medico_apellido").val(data.apellidos);
		});
	}

	const act = function(){

		const id = $("#id").val();
		const medico_nombre = $("#medico_nombre").val();
		const medico_apellido = $("#medico_apellido").val();
		const route = "{{ url('medico') }}/"+id+"/actualizar";
		const token = $("#token").val();

		$.ajax({
			url:route,
			headers:{'X-CSRF-TOKEN':token},
			type:'put',
			dataType:'json',
			data:{ id: id,
					medico_nombre:medico_nombre,
					medico_apellido:medico_apellido,
					token:token},
			success:function(data){
				if (data.success == 'true') {
					medico_listado();
					$("#editmedico").modal("toggle");
					$("#datos_act").fadeIn();
					$("#datos_act").show().delay(3000).fadeOut(1);	
				}
			},
			error:function(data){
				//console.log(data.responseJSON.errors);
				const error_validacion = data.responseJSON.errors;
				//console.log(error_validacion);
				if (error_validacion.hasOwnProperty('medico_nombre') && error_validacion.hasOwnProperty('medico_apellido')) {
					$("#error-name").empty().html(data.responseJSON.errors.medico_nombre);
					$("#error-apellido").empty().html(data.responseJSON.errors.medico_apellido);
					$("#mostrar-error-name").fadeIn();
					$("#mostrar-error-apellido").fadeIn();
				}
				else if (error_validacion.hasOwnProperty('medico_nombre')) {
					$("#error-name").empty().html(data.responseJSON.errors.medico_nombre[0]);
					$("#mostrar-error-name").fadeIn();
				}
				else if(error_validacion.hasOwnProperty('medico_apellido')){
					$("#error-apellido").empty().html(data.responseJSON.errors.medico_apellido[0]);
					$("#mostrar-error-apellido").fadeIn();
				}
			}		
		});
	}

	const borrado_medico = function(id,nombres,apellidos){
		const question_alert = confirm("estas seguro de ELIMINAR a "+nombres+" "+apellidos+ " de la lista?");

		if (question_alert == true) {

			const route = "{{ url('medico') }}/"+id+"/destruir";
			const token = $("#token").val();

			$.ajax({
				url:route,
				headers:{'X-CSRF-TOKEN':token},
				type:'delete',
				dataType:'json',
				success:function(data){
					if (data.success == 'true') {
						medico_listado();
						$("#eliminado").fadeIn();
						$("#eliminado").show().delay(3000).fadeOut(1);
					}
				}
			})
		}
	}
</script>
@endsection