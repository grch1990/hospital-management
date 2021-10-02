var app = new Vue({
	el: '#app',
	components: {
	  draggable: vuedraggable,
	  wysiwyg: vueWysiwyg.default.component,
	},
	data() {
		return {
			tiposDatos: [],
			campo2Add: {},
			campos2Remove: [],
			rows2Remove: [],
			solapas2Remove: [],
			formularios: [],
			enabled: true,
			campoModel: {
				tipo_dato_id: 1,
				campo: '',
				opciones: 0,
				requerido: 0,
				opciones_avanzadas: {bloqueado: null, longitud: null},
			},
			dragging: false,
			lastIndex: 0,
			solapaActive: 0,
			rowActive: 0,
			opciones2Add: [],
			opcion2Add: {opcion: ''},
			noty: null,
			axios: null,
			colegio: null,
			baseURL: '',
			motivo: '',
			editActive: false,
			beforeEdit: {},
			opciones2Remove: [],
			opcionesBeforeEdit: [],
			edit: null,
			wysiwygOptions: {},
			formularioConf: {},
			emails2Add: [],
			email2Add: '',
			emails2Remove: [],
			camposEmail: [],
			campoEmail: "NULL",
			fileEmailTemp: "",
			filesEmail: [],
			campoEstudiante2Add: "NULL",
			camposEstudiantes: [],
			campoEstudianteNombre: "",
			previewBanner: {src: "", edited: false},
			fieldLinkDate: "NULL",
		}
	},
	created() {
		this.baseURL = document.getElementById('app').dataset.baseUrl;
		this.tiposDatos = JSON.parse(document.getElementById('app').dataset.tiposDatos);
		this.colegio = JSON.parse(document.getElementById('app').dataset.colegio);
		this.formularios = JSON.parse(document.getElementById('app').dataset.formulario);
		this.formularioConf = JSON.parse(document.getElementById('app').dataset.formularioConf);
		this.campo2Add = Object.assign({}, this.campoModel);
		this.wysiwygOptions = {
			hideModules: {
				"table": true,
				"image": true,
				"code": true,
				"separator": true,
			},
			forcePlainTextOnPaste: true
		};

		if (!this.formularioConf.opciones || (Object.keys(this.formularioConf.opciones).length == 0)) {
			this.formularioConf.opciones = {nombre_colegio: true, vista_ingreso: true, ingreso_campo_id: "NULL", banner: ""};
		}

		this.formularioConf.ce_campos = this.formularioConf.ce_campos || [];
		this.formularioConf.ce_adjuntos = this.formularioConf.ce_adjuntos || [];
		this.formularioConf.ce_remitente = this.formularioConf.ce_remitente || {correo_electronico: "", nombre: ""};
		this.formularioConf.campos_estudiante = this.formularioConf.campos_estudiante || {};
		this.formularioConf.correos_electronicos = this.formularioConf.correos_electronicos || [];

		if (Object.keys(this.formularioConf.campos_estudiante).length < 4) {
			this.formularioConf.campos_estudiante = {
				nombres: "NULL",
				apellidos: "NULL",
				identificacion: "NULL",
				grado: "NULL",
			};
		}

		console.log(this.formularios);
	},
	mounted () {
		tippy('[data-tippy-content]', {
		  arrow: true,
		  arrowType: 'round',
		});
	},
	methods: {
		capitalize: function (string) {
		  return string.charAt(0).toUpperCase() + string.slice(1);
		},
		getNoty: function (text, type = 'success', timeout = 5000) {
			return new Noty({
				theme: 'metroui',
				timeout: timeout,
				text: text,
				type: type
			}).show();
		},
		getDato: function (tipo_dato_id, element) {
			var result = this.tiposDatos.filter(function (element) {
				return element.id == tipo_dato_id;
			});

			return result[0].tipo;
		},
		addCampo: function () {
			if ([4, 5].includes(this.campo2Add.tipo_dato_id) && this.opciones2Add.length < 1) {
				this.getNoty('¡Debe agregar al menos una opción al campo desplegable!', 'error');
				return;
			}

			if ([13].includes(parseInt(this.campo2Add.tipo_dato_id)) && this.fieldLinkDate == "NULL") {
				this.getNoty('¡Debe seleccionar un campo de fecha!', 'error');
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
			this.campo2Add = Object.assign({}, this.campoModel);
			this.opciones2Add = [];
		},
		campoEdit: function (campo, index, row) {
			this.beforeEdit = Object.assign({}, campo);
			this.editActive = {index: index, row: row};
			this.campo2Add = campo;

			if ([13].includes(parseInt(this.campo2Add.tipo_dato_id))) {
				this.fieldLinkDate = (this.campo2Add.opciones && this.campo2Add.opciones.length)
					? this.campo2Add.opciones[0].opcion
					: "NULL";
			}

			console.log(campo);

			if (!this.campo2Add.hasOwnProperty("opciones_avanzadas") || !this.campo2Add.opciones_avanzadas) {
				this.$set(this.campo2Add, "opciones_avanzadas", this.campoModel.opciones_avanzadas);
			}

			if (this.getOpcion) {
			    if (campo.opciones.length > 0) {
    				this.opcionesBeforeEdit = campo.opciones.slice(0);
    				this.opciones2Add = campo.opciones;
			    } else {
			        this.opcionesBeforeEdit = [];
    				this.opciones2Add = [];    
			    }
			}
		},
		campoUpdate: function () {
			if ([4, 5].includes(this.campo2Add.tipo_dato_id) && this.opciones2Add.length < 1) {
				this.getNoty('¡Debe agregar al menos una opción al campo desplegable!', 'error');
				return;
			}

			if ([13].includes(this.campo2Add.tipo_dato_id)) {
				if (this.fieldLinkDate == "NULL") {
					this.getNoty('¡Debe seleccionar un campo de fecha!', 'error');
					return;
				}

				this.campo2Add.opciones = [{opcion: this.fieldLinkDate}];
			}

			if (this.campo2Add.campo.length === 0) {
				this.getNoty('¡Debe definir nombre del campo!', 'error');
				return;
			}

			console.log(this.campo2Add);

			this.editActive = false;
			this.campo2Add = Object.assign({}, this.campoModel);
			this.opciones2add = [];
			this.fieldLinkDate = "NULL";
			this.getNoty('Campo actualizado', 'info');
		},
		campoUpdateCancel: function () {
			this.formularios[this.solapaActive]
				.campos[this.editActive.row][this.editActive.index] = Object.assign({}, this.beforeEdit);
			this.formularios[this.solapaActive]
				.campos[this.editActive.row][this.editActive.index].opciones = this.opcionesBeforeEdit.slice(0);

			this.campo2Add = Object.assign({}, this.campoModel);
			this.opciones2add = [];
			this.editActive = false;
		},
		campoRemove: function (row_index, index, campo) {
			this.formularios[this.solapaActive].campos[row_index].splice(index, 1);

			if (campo.id) {
				this.campos2Remove.push(campo.id);
			}
		},
		solapaChange: function (index) {
			this.solapaActive = index;
		},
		solapaAdd: function () {
			this.formularios.push({solapa: 'Nueva solapa', campos: [[]]});
			this.solapaActive = this.formularios.length-1;
		},
		solapaRemove: function (solapa) {
			if (this.formularios.length > 1) {
				if (this.formularios[this.solapaActive].id) {
					this.solapas2Remove.push(this.formularios[this.solapaActive].id);
				}

				this.formularios.splice(this.solapaActive, 1);
				this.solapaActive = this.solapaActive-1;	
			} else {
				this.getNoty('Debe permanecer al menos una solapa', 'info');
			}
		},
		rowAdd: function () {
			this.formularios[this.solapaActive].campos.push([]);
			this.rowActive = this.formularios[this.solapaActive].campos.length-1;
		},
		rowChange: function (index) {
			this.rowActive = index;
		},
		rowRemove: function (index) {
			var self = this;

			if (this.formularios[this.solapaActive].campos[index].length > 0) {
				this.formularios[this.solapaActive].campos[index].map(function (element, index) {
					if (element.id) {
						self.campos2Remove.push(element.id);
					}
				});
				this.formularios[this.solapaActive].campos.splice(index, 1);
			}
		},
		modalOpciones: function () {
			$('#modal-opciones').modal('show');
		},
		opcionAdd: function () {
			this.opciones2Add.push(this.opcion2Add);
			this.opcion2Add = {opcion: ''};
		},
		opcionRemove: function (opcion, index) {
			if (opcion.id) {
				this.opciones2Remove.push(opcion.id);
			}

			this.opciones2Add.splice(index, 1);
		},
		saveFormulario: function () {
			const noty = new Noty({
				theme: 'metroui',
				timeout: false,
				text: 'Actualizando...',
				type: 'info'
			});
			noty.show();

			for (const key in this.formularioConf.opciones) {
				if (this.formularioConf.opciones[key] == undefined) {
					this.formularioConf.opciones[key] = false;
				}
			}

			axios.post('/formulario/editar', this.toFormData({
				'formularios': this.formularios,
				'colegio_id': this.colegio.id,
				'solapas2Remove': this.solapas2Remove,
				'campos2Remove': this.campos2Remove,
				'formulario_conf': this.formularioConf,
				'opciones2Remove': this.opciones2Remove,
			}))
			.then(function (response) {
				if (response.data.success === true) {
				    new Noty({
    			    	theme: 'metroui',
    			    	killer: true,
    				    timeout: 10000,
    				    text: '¡Formulario actualizado con éxito!',
    				    type: 'success'
			       }).show();
				} else if (response.data.error === true) {
				    new Noty({
    			        theme: 'metroui',
    			        killer: true,
    				    timeout: 10000,
    				    text: response.data.msg,
    				    type: 'error'
			        }).show();
				}
			});
		},
		pickFile: function () {
			document.getElementById('file-add').click();
		},
		file2Add: function (event) {
			const files = event.target.files || event.dataTransfer.files;
			this.campo2Add.opciones = [files[0]];
		},
		toFormData: function(obj, form, namespace) {
			let fd = form || new FormData();
			let formKey;
			
			for (let property in obj) {
			  if (obj.hasOwnProperty(property)) {
				if (namespace) {
				  formKey = namespace + '[' + property + ']';
				} else {
				  formKey = property;
				}
			   
				// if the property is an object, but not a File, use recursivity.
				if (obj[property] instanceof Date) {
				  fd.append(formKey, obj[property].toISOString());
				}
				else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
				  this.toFormData(obj[property], fd, formKey);
				} else { // if it's a string or a File object
				  fd.append(formKey, obj[property]);
				}
			  }
			}
			
			return fd;
		},
		modalEmails: function () {
			this.email2Add = '';
			$('#modal-envio-correo').modal('show');
		},
		emailAdd: function () {
			this.formularioConf.correos_electronicos.push(this.email2Add);
		},
		emailRemove: function (index) {
			this.formularioConf.correos_electronicos.splice(index, 1);
		},
		modalEmailConf: function () {
			this.campoEmail = "NULL";
			this.fileEmailTemp = "";
			$("#modal-conf-correo").modal();
		},
		campoEmailAdd: function () {
			if (this.campoEmail && (this.campoEmail != "NULL")) {
				this.formularioConf.ce_campos.push(Object.assign({}, this.campoEmail));
				this.campoEmail = "NULL";
			}
		},
		campoEmailRemove: function (index) {
			this.formularioConf.ce_campos.splice(index, 1);
		},
		onChangeFileEmail: function (event) {
			this.fileEmailTemp = event.target.files || event.dataTransfer.files;
		},
		fileEmailAdd: function () {
			if (this.fileEmailTemp) {
				this.formularioConf.ce_adjuntos.push(this.fileEmailTemp[0]);
				this.fileEmailTemp = "";
			}
		},
		fileEmailRemove: function (index) {
			this.formularioConf.ce_adjuntos.splice(index, 1);
		},
		modalCamposEstudiantes: function () {
			$('#modal-campos-estudiantes').modal('show');
		},
		modalDisenio: function () {
			$('#modal-disenio').modal('show');
		},
		onChangeBanner: function (event) {
			const self = this;
			const files = event.target.files || event.dataTransfer.files;
			const reader = new FileReader();

			if (!files.length) return;

	      	reader.onload = item => {
	        	self.previewBanner.src = item.target.result;
	        	self.previewBanner.edited = true;
	      	};

	      	this.formularioConf.opciones.banner = files[0];

	      	reader.readAsDataURL(files[0]);
		},
	},
	computed: {
		getOpcion: function () {
			var self = this;

			var result = this.tiposDatos.filter(function (element) {
				return element.id == self.campo2Add.tipo_dato_id;
			})[0].opciones;

			return result;
		},
		getCampos: function () {
			const campos = [].concat.apply([], this.formularios.map(solapa => {
				let temp = solapa.campos;
	
				if (!Array.isArray(temp)) {
					temp = Object.keys(temp).map(i => temp[i])
				}
				
				return [].concat.apply([], temp.map(fila => {
					return fila.filter(campo => {
						return ![3, 5, 6, 7, 8, 9, 10].includes(campo.tipo_dato_id);
					});
				}));
			}));

			return campos;
		},
		getBanner: function () {
			if (this.previewBanner.edited ) {
				return this.previewBanner.src;
			} else if (this.formularioConf.opciones.banner) {
				return `${this.baseURL}/imagen/${this.formularioConf.opciones.banner}`;
			}

			return "";
		},
		getDateFields: function () {
			const campos = [].concat.apply([], this.formularios.map(solapa => {
				let temp = solapa.campos;
			
				if (!Array.isArray(temp)) {
					temp = Object.keys(temp).map(i => temp[i])
				}
				
				return [].concat.apply([], temp.map(fila => {
					return fila.filter(campo => {
						return campo.tipo_dato_id == 2;
					});
				}));
			}));

			return campos;
		}
	},
	watch: {
		"formularioConf.opciones.vista_ingreso": function (value) {
			if (value == false) {
				this.formularioConf.opciones.ingreso_campo_id = "NULL";
			}
		},
	},
	filters: {
		capitalize: function (value) {
			if (!value) return ''
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	}
});
