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

  $('.link-external').on('click', function (evnt) {
    evnt.preventDefault();

    window.open($(this).attr('href'));
  });
})

// Vue
var app = new Vue({
  el: '#app',
  data() {
    return {
      baseUrl: '',
      rowId: window.custom.rowId,
      modalShow: false,
      modalSolapas: null,
    };
  },
  mounted() {
    this.baseUrl = document.getElementsByTagName("body")[0].dataset.url || "";
  },
  methods: {
    openDetails(id) {
      var self = this;

      axios.get(`${this.baseUrl}/matricula/show/${id}`)
      .then(function (response) {
        if (response.data.solapas) {
          var solapas = response.data.solapas;
          self.modalSolapas = solapas;
          $("#modal-details").modal();
        }
      });
    }
  }
});