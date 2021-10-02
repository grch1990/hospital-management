@extends('layouts.main')

@section('custom_css')

<style type="text/css">
	
	.box-body{

		margin-left: 200px;
	}

	.title-title h4{
		text-align: center;
		margin-top: 90px;
	}
</style>

@section('content')
	
	<div class="box-body">

		
	<div class="title-title">
		<h4 class="mb-3 line-head">Registrar Medico</h4>
	</div>
	<div class="tile-body">
		<div class="row justify-content-md-center">
			<div class="col-6">
				<form class="form-horizontal" id="form">
					
					<div class="form-group">
						<label class="col-form-label" for="">
							<span data-toggle="tooltip" title="">Nombres</span>
							</label>
							<input id="nombres" class="form-control" name="nombres" type="text">
					</div>

					<div class="form-group">
						<label class="col-form-label" for="">
							<span data-toggle="tooltip" title="">Apellidos</span>
							</label>
							<input id="apellidos" class="form-control" name="apellidos" type="text">
					</div>

					   {{ csrf_field() }}

					<div class="col-sm-12 text-center">
						<button type="submit" id="guardar" class="btn btn-primary">Guardar</button>
						<button type="reset" class="btn btn-default">Restablecer</button>
					</div>
				</form>
			</div>			
			
		</div>
	</div>		
		
	</div>


@endsection

@section('custom_js')

<script>
	
	$("#guardar").click(function(event){
		
		event.preventDefault();
		var nombres = $("#nombres").val();
		var apellidos = $("#apellidos").val();
		var token = $("input[name=_token]").val();

		var route = "{{route('medicos.store')}}";
		var dataString = { 
			nombres:nombres,
			apellidos:apellidos};
		
		$.ajax({

			url:route,
			headers:{'X-CSRF-TOKEN':token},
			type:'post',
			dataType:'json',
			data:dataString,
			success:function(data){
				if (data.success == true) {

					alert("inserto datos");
				}
			},
			error:function(data){

				alert("error");
			}

		});
	});

</script>
@endsection