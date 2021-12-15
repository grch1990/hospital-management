<table style="width: 90%;" class="table table-bordered data-table">
	<thead>
		<tr>
			<th>ID</th>
			<th>NOMBRE</th>
			<th>Opciones</th>
		</tr>
	</thead>
	<tbody>
		@foreach($medicamentos as $m)
		<tr>
			<td>{{$m->id}}</td>
			<td>{{$m->nombre}}</td>
			<td>
				<div class="">
					<a href="#" onclick="muestreo({{$m->id}});" class="btn  btn-sm btn-warning fa fa-pencil"data-toggle="modal" data-target="#editMedicina" title="Editar">
					</a>
					<a href="#" onclick="eliminar('{{$m->id}}','{{$m->nombre}}');" class="btn btn-sm btn-danger fa fa-trash" data-toggle="tooltip" title="Eliminar">
					</a>
				</div>
			</td>
		</tr>
		@endforeach
	</tbody>
</table>