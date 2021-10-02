  var app = new Vue({
	el: "#app",
  data: function () {
    return {
      baseUrl: "",
      agregarFormulario: false,
      colegioId: "NULL",
      formularios: [],
      formularioId: "NULL",
      campos: [],
      camposAgregados: [],
      campos: [],
      campoId: "NULL",
    }
  },
  mounted: function () {
    this.baseUrl = document.getElementsByTagName("body")[0].dataset.url;
    this.colegioId = document.getElementById("app").dataset.colegioId;
  },
  methods: {
    getFormularios: function (colegioId = null) {
      colegioId = parseInt(colegioId);

      if (colegioId && colegioId > 0) {
        var self = this;

        axios.get(`${this.baseUrl}/api/colegio/${colegioId}/formularios`)
        .then(function (response) {
          if (response.data.formularios) {
            self.formularios = response.data.formularios;
          }
        });
      }
    },
    agregarCampo: function () {
      if (this.campoId) {
        var campoAgregar = this.getCampo(parseInt(this.campoId));

        if (campoAgregar && (Object.keys(campoAgregar).length > 0)) {
          this.camposAgregados.push(campoAgregar);
        }

        this.campoId = "NULL";
      }
    },
    getCampo: function () {
      if (this.campoId) {
        var self = this;

        var campoFiltrado = this.campos.filter(function (elemento) {
          return (parseInt(elemento.id) === parseInt(self.campoId));
        });

        return (campoFiltrado && (campoFiltrado.length > 0)) ? campoFiltrado[0] : {};
      }

      return {};
    },
    quitarCampo: function (campoId = null) {
      if (campoId) {
        for (var i = 0; i < this.camposAgregados.length; i++) {
          if (parseInt(this.camposAgregados[i].id) === parseInt(campoId)) {
            this.camposAgregados.splice(i, 1);
            break;
          }
        }
      }
    },
    getIdsCampos: function (listado) {
      return listado.map(function (elemento) {
        return parseInt(elemento.id);
      });
    },
  },
  computed: {
    camposFiltrados: function () {
      var self = this;
      var ids = this.getIdsCampos(this.camposAgregados);

      return this.campos.filter(function (elemento) {
        return !ids.includes(parseInt(elemento.id));
      });
    },
  },
  watch: {
    colegioId: function (value) {
      if (this.agregarFormulario === true) {
        this.getFormularios(value);
      } else {
        this.formularioId = "NULL";
        this.formularios = [];
      }
    },
    formularioId: function (value) {
      value = parseInt(value);
      
      if (value) {
        var self = this;

        axios.get(`${this.baseUrl}/formulario/${value}/campos`)
        .then(function (response) {
          if (response.data.campos) {
            self.campos = response.data.campos;
          }
        });
      } else {
        this.campoId = "NULL";
        this.campos = [];
      }
    },
    agregarFormulario: function (value) {
      console.log(this.colegioId);

      if (value === true && this.colegioId) {
        this.getFormularios(this.colegioId);
        this.camposAgregados = [];
      }
    },
  },
});