// jQuery
window.custom = {
  rowId: 0,
};

$(document).ready(function () {
  $('.dataTable').DataTable({
      "language": {
          "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json",
      }
  });
  $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });

  $('.custom-delete').on('click', function (evnt) {
    evnt.preventDefault();
    var url = $(this).attr('href');
    var self = $(this);

    Swal.fire({
      title: '¿Desea eliminar la matrícula?',
      text: "No podrá recuperarlo",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          url: url,
          type: 'DELETE',
          success: function (result) {
            if (result.success === true) {
              self.closest('tr').remove();
              Swal.fire('¡Eliminado!', 'Matricula eliminada con éxito', 'success');
            }
          }
        });
      }
    });		
  })
})

// Vue
var app = new Vue({
  el: '#app',
  data() {
    return {
      baseUrl: '',
      rowId: window.custom.rowId,
      modalShow: false,
      solapas: null,
      tabActive: 0,
    };
  },
  mounted() {
    this.baseUrl = document.getElementsByTagName("body")[0].dataset.url || "";
    tippy('[data-tippy-content]', {
      arrow: true,
      arrowType: 'round',
    });
  },
  methods: {
    tabChange(index) {
      this.tabActive = index;
    },
    openDetails(id) {
      var self = this;

      axios.get(`${this.baseUrl}/matricula/show/${id}`)
      .then(function (response) {
        if (response.data.solapas) {
          self.solapas = response.data.solapas;
          self.tabActive = 0;
          self.$nextTick(function () {
            $("#modal-show").modal();
          })
        }
      });
    },
    descargarDocumento(campo = null) {
      if (campo && (Object.keys(campo).length > 0)) {
        var self = this;

        axios.get(`${this.baseUrl}/matricula-documento/verificar/${campo.id}`)
        .then(function (response) {
          if (response.data.success) {
            window.open(`${self.baseUrl}/matricula-documento/${campo.id}`);
          } else {
            new Noty({
              theme: 'metroui',
              timeout: 5000,
              text: response.data.message,
              type: 'error'
            }).show();
          }
        });
      }
    }
  }
});