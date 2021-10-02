var app = new Vue({
	el: '#app',
	components: {
	  draggable: vuedraggable,
	},
	data() {
		return {
			tiposDatos: [],
			campo2Add: {},
			formularios: [
				{solapa: 'Datos personales', campos: [
					[]
				]}
			],
			enabled: true,
			list: [
			  { name: "John", id: 0 },
			  { name: "Joao", id: 1 },
			  { name: "Jean", id: 2 }
			],
			dragging: false,
			lastIndex: 0,
			solapaActive: 0,
			rowActive: 0,
			opciones2Add: [],
			opcion2Add: {opcion: ''},
			noty: null,
			axios: null,
			colegio: null,
			url: '',
		}
	},
	created() {
		this.tiposDatos = JSON.parse(document.getElementById('app').dataset.tiposDatos);
		this.colegio = JSON.parse(document.getElementById('app').dataset.colegio);
		this.campo2Add = {tipo_dato_id: 1, campo: '', opciones: 0};

		this.axios = axios.create({
		  baseURL: 'http://localhost:8000',
		});
	},
	methods: {
		capitalize: function (string) {
		  return string.charAt(0).toUpperCase() + string.slice(1);
		},
		getNoty: function (text, type = 'success') {
			return new Noty({
				theme: 'metroui',
				timeout: 5000,
				text: text,
				type: type
			}).show();
		},
		getDato: function (tipo_dato_id) {
			return this.tiposDatos.filter(function (element) {
				return element.id === tipo_dato_id;
			})[0].tipo;
		},
		addCampo: function () {
			console.log(this.solapaActive, this.lastIndex, this.formularios, this.campo2Add);

			if ([4, 5].includes(this.campo2Add.tipo_dato_id) && this.opciones2Add.length < 1) {
				this.getNoty('¡Debe agregar al menos una opción al campo desplegable!', 'error');
				return;
			}

			if (this.campo2Add.campo.length === 0) {
				this.getNoty('¡Debe definir nombre del campo!', 'error');
				return;
			}

			if (this.formularios[this.solapaActive].campos[this.rowActive].length >= 3) {
				this.formularios[this.solapaActive].campos.push([]);
				this.rowActive++;
			}

			if (this.opciones2Add.length > 0)
				this.campo2Add.opciones = this.opciones2Add;

			this.formularios[this.solapaActive].campos[this.rowActive].push(this.campo2Add);
			this.campo2Add = {tipo_dato_id: 1, campo: '', opciones: 0};
			this.opciones2Add = [];
		},
		campoRemove: function (row_index, index) {
			this.formularios[this.solapaActive].campos[row_index].splice(index, 1);

			console.log(this.formularios[this.solapaActive].campos[row_index], this.formularios[this.solapaActive].campos[row_index].length)

			// if (this.formularios[this.solapaActive].campos[row_index].length === 0) {
			// 	this.rowActive = 0;
			// 	this.formularios[this.solapaActive].campos.splice(row_index, 1);
			// }
		},
		solapaChange: function (index) {
			this.solapaActive = index;
		},
		solapaAdd: function () {
			this.formularios.push({solapa: 'Nueva solapa', campos: [[]]});
			this.solapaActive = this.formularios.length-1;
		},
		solapaRemove: function () {
			if (this.formularios.length > 1) {
				var beforeActive = this.solapaActive;
				this.solapaActive = this.solapaActive-1;	
				this.formularios.splice(beforeActive, 1);
			}
			// ADD NOTIFY
		},
		rowAdd: function () {
			this.formularios[this.solapaActive].campos.push([]);
			this.rowActive = this.formularios[this.solapaActive].campos.length-1;
			console.log(this.formularios);
		},
		rowChange: function (index) {
			this.rowActive = index;
		},
		rowRemove: function (index) {
			if (this.formularios[this.solapaActive].campos.length > 1) {
				this.formularios[this.solapaActive].campos.splice(index, 1);
			}

			console.log(this.formularios[this.solapaActive].campos)
		},
		modalOpciones: function () {
			$('#modal-opciones').modal('show');
		},
		opcionAdd: function () {
			this.opciones2Add.push(this.opcion2Add);
			this.opcion2Add = {opcion: ''};
			console.log(this.opciones2Add);
		},
		opcionRemove: function (index) {
			this.opciones2Add.splice(index, 1);
		},
		saveFormulario: function () {
			var self = this;
			let formularios = [];
			console.log(this.formularios);

			for (let index = 0; index < this.formularios.length; index++) {
				const solapa = this.formularios[index];

				for (let num_fila = 0; num_fila < solapa.campos.length; num_fila++) {
					const fila = solapa.campos[num_fila];
					
					if (fila.length == 0) {
						this.formularios[index].campos.splice(num_fila, 1);
					}
				}
			}

			console.log('after change', this.formularios);

			// return;
			axios.post('/formulario/crear', {
				'formularios': this.formularios,
				'colegio_id': this.colegio.id,
				'url': this.url,
			})
			.then(function (response) {
				if (response.data.success === true) {
					self.getNoty('¡Formulario creado con éxito!', 'success');
					window.location.reload();
				}
			});
		},
	},
	computed: {
		getOpcion: function () {
			var self = this;

			var result = this.tiposDatos.filter(function (element) {
				return element.id == self.campo2Add.tipo_dato_id;
			})[0].opciones;

			console.log(result);

			return result;
		}
	}
});