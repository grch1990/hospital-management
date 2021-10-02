<table style="width: 90%;" class="table table-bordered data-table">
	<thead>
		<tr>
			<th>Nombres</th>
			<th>Apellidos</th>
			<th>Opciones</th>
		</tr>

	</thead>

	<tbody>

		@foreach($listas as $l)
		<tr>
			<td>{{$l->nombres}}</td>
			<td>{{$l->apellidos}}</td>
			<td>
				<div class="">
					<a href="#" onclick="mostrar({{$l->id}});" class="btn  btn-sm btn-warning fa fa-pencil"data-toggle="modal" data-target="#editMedico" title="Editar">
					</a>

					<a href="" class="btn btn-sm btn-danger fa fa-trash" data-toggle="tooltip" title="Eliminar">
					</a>
				</div>
			</td>
		</tr>
		@endforeach

	</tbody>

</table>

@include('hospital.modal')