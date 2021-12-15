<table style="width: 90%;" class="table table-bordered data-table">
	<thead>
		<tr>
			<th>ID</th>
			<th>NOMBRE</th>
			<th>APELLIDOS</th>
			<th>OPCIONES</th>
		</tr>
	</thead>
	<tbody>
		@foreach($medicos as $ms)
		<tr>
			<td>{{$ms->id}}</td>
			<td>{{$ms->nombres}}</td>
			<td>{{$ms->apellidos}}</td>
			<td>
				<div class="">
					<a href="#" onclick="show({{$ms->id}});" class="btn btn-sm btn-warning fa fa-pencil" data-toggle="modal" data-target="#editmedico" title="Editar">
					</a>
					<a href="#" onclick="borrado_medico('{{$ms->id}}','{{$ms->nombres}}','{{$ms->apellidos}}');" class="btn btn-sm btn-danger fa fa-trash" data-toggle="tooltip" title="Eliminar">
					</a>
				</div>
			</td>
		</tr>
		@endforeach
	</tbody>
</table>