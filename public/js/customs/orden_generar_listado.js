var app = new Vue({
  el: '#app',
  data: function () {
    return {
      baseUrl: '',
      matriculas: [],
      colegioSelected: "NULL",
      matriculasIds: [],
      filtro: "",
      rolId: 0,
      colegioId: 0,
			permitirGenerar: false,
			porGrupo: false,
			formularioId: "NULL",
			campoId: "NULL",
			valor: "NULL",
			formularios: [],
			campos: [],
			valores: [],
    }
  },
  created: function () {
    this.baseUrl = document.getElementsByTagName('body')[0].dataset.url;
  },
  mounted: function () {
    this.rolId = document.getElementById('app').dataset.rolId;
    this.colegioId = document.getElementById('app').dataset.colegioId;

    if (this.rolId == 2) {
      this.colegioSelected = this.colegioId;
    }
    console.log(this.colegioId);
  },
  methods: {
    toggleSelecionarTodos: function () {
      var self = this;

      if ((this.matriculasIds.length > 0)) {
        this.matriculasIds = [];
      } else {
        this.matriculas.map(function (element) {
          if (element.ordenes[0].habilitado) {
            self.matriculasIds.push(element.id);
          }
        });
      }
    }
  },
  computed: {
    matriculasIdsString: function () {
      return JSON.stringify(this.matriculasIds);
    }
  },
  watch: {
    colegioSelected: function (value) {
      var self = this;

      axios.get(`${this.baseUrl}/colegio/${value}/matriculas`)
      .then(function (response) {
        if (response.data.tipo === "success" && response.data.matriculas) {
          self.matriculas = response.data.matriculas;
          self.matriculasFiltradas = response.data.matriculas;
          self.matriculasIds = [];
					self.porGrupo = false;
        } else if (response.data.tipo) {
					new Noty({
						theme: 'metroui',
						timeout: 5000,
						text: response.data.mensaje,
						type: response.data.tipo,
					}).show();

					self.formularios = response.data.formularios;
					self.porGrupo = true;
				}
      })
    },
    filtro: function (newValue = null) {
      if (newValue && (newValue.length > 0) && (this.matriculas.length > 0)) {
        newValue = newValue.toLowerCase();

        var temp = this.matriculas.filter(function (elemento) {
          return ((elemento.nombres.toLowerCase().indexOf(newValue) != -1) 
            || (elemento.apellidos.toLowerCase().indexOf(newValue) != -1))
        });

        this.matriculasFiltradas = temp;
      } else {
        this.matriculasFiltradas = this.matriculas;
      }
    },
		formularioId: function (value) {
			var self = this;

			axios.get(`${this.baseUrl}/formulario/${value}/campos`)
				.then(function (response) {
					if (response.data.campos) {
						self.campos = response.data.campos;
					}
				})
		},
		campoId: function (value) {
			var self = this;

			axios.get(`${this.baseUrl}/formulario/campos/${value}/valor`)
				.then(function (response) {
					if (response.data.valores) {
						self.valores = response.data.valores;
					}
				})
		},
		valor: function (value) {
			var self = this;

			axios.get(`${this.baseUrl}/formulario/valor/${value}/${this.campoId}/matriculas`)
				.then(function (response) {
					if (response.data.matriculas) {
						self.matriculas = response.data.matriculas;
						self.matriculasFiltradas = response.data.matriculas;
						self.matriculasIds = [];
					}
				})
		},
  }
});
