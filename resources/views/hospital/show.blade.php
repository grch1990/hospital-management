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

@section('content')

	<div class="box-body">
	<div class="title-title">
		<h4 class="mb-3 line-head d-flex justify-content-between">Listado de Medicos
			<a type="button" href="" class="btn btn-sm btn-success" data-toggle="tooltip" title="Registrar Colegio">
				<i class="fa fa-plus"></i>Registrar Medico
			</a>
		</h4>
	</div>
		<div class="tile-body">
			<div id="lista"></div>
		</div>
	</div>

@endsection

@section('custom_js')

<script>
	
	$(document).ready(function(){
		listado();
	});

	var listado = function(){

		$.ajax({
			type:'get',
			url:'{{ route('list') }}',
			success: function(data){
				$("#lista").empty().html(data);
				$("#my").modal();
			}
		});
	}

	var mostrar = function(id){

	  var route = "{{url('medicos')}}/"+id+"/edit";
	  $.get(route, function(data){

	  		alert(id);
	  });
	}

</script>

@endsection