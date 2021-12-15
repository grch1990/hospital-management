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

	.validacion{
		color: red;
		font-size: 18px;
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

<div class="title-title">
		<h4 class="mb-3 line-head">Registro de Medico</h4>
	</div>
	<div class="tile-body">
		<div class="row justify-content-md-center">
			<div class="col-8">
				<form class="form-horizontal" action="{{url('medico/validacion')}}" method="POST" enctype="multipart/form-data">
					
				<div class="form-group">
					<label class="col-form-label" for="">
					<span data-toggle="tooltip" title="">Nombres</span>
					</label>
					<input id="" class="form-control" name="nombres" type="text">
				</div>

				@error('nombres')
					<small class="validacion">*{{$message}}</small>
					<br>
					<br>
				@enderror
				
				<div class="form-group">
					<label class="" for="">
						<span data-toggle="tooltip" title="">Apellidos</span>
						</label>
						<input id="" class="form-control" name="apellidos" type="text">
				</div>

				@error('apellidos')
					<small class="validacion">*{{$message}}</small>
					<br>
					<br>
				@enderror
				</div>
			</div>
		</div>

		   {{ csrf_field() }}

		<div class="col-sm-12 text-center">
			<button type="submit" class="btn btn-primary">Guardar</button>
			<button type="reset" class="btn btn-default">Restablecer</button>
		</div>


				</form>
			</div>			
			
		</div>
	</div>


@endsection
