<div class="modal fade" id="editMedicina" tabindex="-1" role="dialog" aria-labelledby="editMedicinaLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel"></h4>
			</div>
			<div class="modal-body">        
        <div id="message-error" class="alert alert-danger" style="display: none">
          <strong id="error"></strong>
        </div>

        <div id="msj-error-error" class="alert alert-danger" style="display: none">
          <strong id="msj-validation"></strong>
        </div>

        <form id="form">
          <div hidden="hidden">  
            <input type="hidden"  id="id_medicina">
            <input type="hidden"  name="_token" value="{{ csrf_token() }}" id="token" >
          </div>
          <div class="form-group">
            <label for="recipient-name" class="control-label">MEDICAMENTO:</label>
            <input type="text" name="nombre" class="form-control" id="nombre_medicina">
          </div>
          
        </form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				<button type="button" Onclick="act();" class="btn btn-primary">Actualizar</button>
			</div>
		</div>
	</div>
</div>