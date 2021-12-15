<div class="modal fade" id="ventana" tabindex="-1" role="dialog" aria-labelledby="ventanaLabel" aria-hidden="true">
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

        <div id="m-show-name" class="alert alert-danger" style="display: none">
          <strong id="m-validation-name"></strong>
        </div>


        <div id="m-show-apellido" class="alert alert-danger" style="display: none">
          <strong id="m-validation-apellido"></strong>
        </div>

        <form id="form">
          <div hidden="hidden">  
            <input type="hidden"  id="id">
            <input type="hidden"  name="_token" value="{{ csrf_token() }}" id="token" >
          </div>

          <div class="form-group">
            <label for="recipient-name" class="control-label">NOMBRE:</label>
            <input type="text" name="name_medico" class="form-control" id="name_medico">
          </div>
          
          <div class="form-group">
            <label for="recipient-name" class="control-label">APELLIDO:</label>
            <input type="text" name="apellido_medico" class="form-control" id="apellido_medico">
          </div>
          
        </form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				<button type="button" onclick="grd();" class="btn btn-primary">Enviar</button>
			</div>
		</div>
	</div>
</div>