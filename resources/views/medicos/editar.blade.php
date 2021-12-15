<div class="modal fade" id="editmedico" tabindex="-1" role="dialog" aria-labelledby="editmedicoLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel"></h4>
			</div>
			<div class="modal-body">        

        <div id="mostrar-error-name" class="alert alert-danger" style="display: none">
          <strong id="error-name"></strong>
        </div>

        <div id="mostrar-error-apellido" class="alert alert-danger" style="display: none">
          <strong id="error-apellido"></strong>
        </div>

        <form id="form">
          <div hidden="hidden">  
            <input type="hidden" name="id" id="id">
            <input type="hidden"  name="_token" value="{{ csrf_token() }}" id="token" >
          </div>

          <div class="form-group">
            <label for="recipient-name" class="control-label">NOMBRE:</label>
            <input type="text" name="medico_nombre" class="form-control" id="medico_nombre">
          </div>
          
          <div class="form-group">
            <label for="recipient-name" class="control-label">APELLIDO:</label>
            <input type="text" name="medico_apellido" class="form-control" id="medico_apellido">
          </div>
          
        </form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				<button type="button" onclick="act();" class="btn btn-primary">Enviar</button>
			</div>
		</div>
	</div>
</div>