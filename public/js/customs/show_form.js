// import VueSweetalert2 from 'https://cdn.jsdelivr.net/npm/vue-sweetalert2@2.0.5/dist/index.min.js';
var app = new Vue({
	el: '#app',
	data() {
		return {
			tiposDatos: [],
			colegio: null,
			formulario: null,
			solapaActive: 0,
			ordenId: 0,
			grado: 0,
			formRequest: {},
			datos2Tabla: [],
			temp2Tabla: {},
			matricula: {},
			disableds: [],
			tabla2Remove: [],
			disabledNames: [],
			sendSave: false,
			requireds: [],
			neededs: [],
			fieldsPreLoad: [],
			fieldFail: null,
			solapaFail: null,
			message: false,
			baseURL: '',
			matriculaId: 0,
			dateFields: [],
			updated: false,
		}
	},
	created () {
		var self = this;

		this.updated    = document.getElementById('app').dataset.updated !== "0";
		this.colegio    = JSON.parse(document.getElementById('app').dataset.colegio);
		this.formulario = JSON.parse(document.getElementById('app').dataset.formulario);
		this.matricula  = JSON.parse(document.getElementById('app').dataset.matricula);
		this.matriculaId  = document.getElementById('app').dataset.matriculaId || 0;
		this.formUrl    = document.getElementById('app').dataset.formUrl;
		this.ordenId    = document.getElementById('app').dataset.orden;
		this.grado      = document.getElementById('app').dataset.grado;
		this.forUpdate  = (document.getElementById('app').dataset.forUpdate)
			? JSON.parse(document.getElementById('app').dataset.forUpdate) : null;
		this.fieldsPreLoad = {
			nombres:   this.matricula.nombres,
			apellidos: this.matricula.apellidos,
		};

		this.axios = axios.create({
		  baseURL: 'http://localhost:8000',
		});

		for (var i = 0; i < this.formulario.solapas.length; i++) {
			var solapa = this.formulario.solapas[i];

			for (var j = 0; j < solapa.campos.length; j++) {
				var campo = solapa.campos[j];
				var key = '';
				var fieldUpdate = this.getElement4Update(''+campo.id);

				if (this.forUpdate && (fieldUpdate)) {
					key = campo.id+'-'+fieldUpdate.id;

					if ((fieldUpdate) && campo.tipo_dato_id == 9) {
						var rowsTable = this.getElements4Update('' + campo.id);

						for (let index_ = 0; index_ < rowsTable.length; index_++) {
							const element = rowsTable[index_];
							var opcionRaw = JSON.parse(element.valor);
							var opcionRow = {};
	
							for (var property in opcionRaw) {
								opcionRow[property] = opcionRaw[property];
							}
	
							this.datos2Tabla.push({
								id: element.id,
								value: opcionRow,
								name: 'input-'+campo.id+'-'+element.id,
								tipo_dato_id: campo.campo.tipo_dato_id,
							});
						}			
					}
				} else {
					key = ''+campo.id;
				}

				key += (campo.tipo_dato_id && [4, 5].includes(parseInt(campo.tipo_dato_id)))
					? '-select' : '';

				if (Boolean(parseInt(campo.requerido)) == true) {
					this.requireds.push(key);
				}

				if ([13].includes(parseInt(campo.tipo_dato_id))) {
					this.dateFields.push({campo_id: campo.id, opcion_id: campo.opciones[0].opcion});
				}

				var value_temp = (this.forUpdate && fieldUpdate && ![3, 7].includes(parseInt(campo.tipo_dato_id)))
					? fieldUpdate.valor : null;

                this.$set(this.formRequest, key, value_temp);

				if (!this.forUpdate && !fieldUpdate && campo.tipo_dato_id == 2) {
					var today = new Date();
					this.formRequest[key] = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
				}

				if (campo.opciones_avanzadas && campo.opciones_avanzadas.hasOwnProperty("bloqueado") && campo.opciones_avanzadas.bloqueado) {
					this.disableds.push(campo.id)
				}

				if (i == 0 || (i == 2 && this.colegio.id == 5)) {
					if (this.fieldsPreLoad.hasOwnProperty(campo.campo.toLowerCase())) {
						var fieldToLower = campo.campo.toLowerCase();
						var exist = this.disabledNames.filter(function (element) {
							return (fieldToLower.indexOf(element.toLowerCase()) >= 0);
						});

						if (exist.length < 2) {
							this.disableds.push(campo.id);
							this.disabledNames.push(campo.campo);
						}
						this.formRequest[key] = this.fieldsPreLoad[fieldToLower];
					}

					if (campo.campo.toLowerCase().indexOf('grado') == 0) {
						var grado_tmp = campo.opciones.filter(function (element) {
							return element.opcion == ((parseInt(self.grado) < 10) ? '0' + self.grado : self.grado);
						});

						if ((campo.opciones.length > 0) && !this.formRequest[key]) {
							this.formRequest[key] = ''+((grado_tmp[0]) ? grado_tmp[0].id : campo.opciones[1].id);
						}
						
						this.disableds.push(campo.id);
					}
				}
			}
		}
		
		// console.log(this.dateFields);
		// console.log(this.datos2Tabla);
		// console.log(this.forUpdate);
		// console.log(this.formulario);
		// console.log(this.formRequest);
		// console.log(this.requireds);
	},
	mounted () {
		this.baseURL = document.getElementsByTagName('body')[0].dataset.url;
		tippy('[data-tippy-content]', {
		  arrow: true,
		  arrowType: 'round',
		});

		VMasker(document.querySelectorAll(".numeric-only")).maskNumber();	
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
		solapaChange: function (index) {
			var pass   = true;
			var solapa = this.formulario.solapas[this.solapaActive];

			if (this.solapaActive != 'documentos') {
				for (var i = 0; i < solapa.campos.length; i++) {
					var campo       = solapa.campos[i];
					var fieldUpdate = this.getElement4Update(''+campo.id);
					var key         = '';
					var value       = '';
	
					if (this.forUpdate && (fieldUpdate)) {
						key = campo.id+'-'+fieldUpdate.id;
					} else {
						key = ''+campo.id;
					}
	
					key += (campo.tipo_dato_id && [4, 5].includes(parseInt(campo.tipo_dato_id)))
						? '-select' : '';
					value = this.formRequest[key];
	
					if (this.requireds.includes(key)) {
    					if ((!value || value == null || value == undefined || value == '' || value.length == 0)
    						&& (![3, 7].includes(parseInt(campo.tipo_dato_id))))
    					{
    						this.fieldFail = key.split('-')[0];
    						this.solapaFail = this.solapaActive;
    	
    						pass = false;
    						this.getNoty('¡Debe completar todos los campos requeridos antes de cambiar de sección!', 'error');
    						break;
    					} else if (campo.tipo_dato_id == 12 && !this.validateEmail(value)) {
    						this.fieldFail = key.split('-')[0];
    						this.solapaFail = this.solapaActive;
    
    						pass = false;
    						this.getNoty('¡Campo de correo electrónico inválido!', 'error');
    						break;
    					}
					}
				}
			}

			if (pass) {
				this.solapaActive = index;
				this.solapaFail = null;
			}
		},
		getNoty: function (text, type = 'sucess') {
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
		saveDatos: function () {
			var self       = this;
			var inputFiles = {};
			var request    = new FormData();
			var swalConfig = {};
			this.sendSave = true;

			request.append('orden_id', this.ordenId);
			request.append('matricula_id', this.matriculaId);
			request.append('from_table_remove', JSON.stringify(this.tabla2Remove));

			if (document.querySelectorAll('input[type=file]').length > 0) {
				document.querySelectorAll('input[type=file]').forEach(function (element) {
					if (element.getAttribute('type') == 'file') {
						var nombreInput = element.dataset.name.split('-');
						var temp = (nombreInput.length > 2) ? "-"+nombreInput[2] : "";

						inputFiles[""+nombreInput[1]+temp] = element.files[0];
					}
				});
			}

			for (var property in this.formRequest) {
				var value = this.formRequest[property];
				var fieldUpdate = this.getElement4Update(''+property.split('-')[0]);

				// if ((fieldUpdate) && [3, 7].includes(parseInt(fieldUpdate.campo.tipo_dato_id)))
				// 	continue;

				if (this.requireds.includes(property)
					&& (!value || value == null || value == undefined || value == '' || value.length == 0))
				{
					var campoId = parseInt(property.split('-')[0]);

					if (!this.neededs.includes(campoId)) {
						this.neededs.push(campoId);
					}
					// this.fieldFail = property.split('-')[0];
					this.sendSave = false;
					return this.getNoty('¡Debe ingresar todos los campos requeridos!', 'error');
				}

				if (inputFiles.hasOwnProperty(property)) {
					request.append('input-'+property, inputFiles[property]);
				} else {
					request.append('input-'+property, this.formRequest[property]);
				}
			}

			if (this.datos2Tabla.length > 0) {
				for (var i = 0; i < this.datos2Tabla.length; i++) {
					var datoTemp = this.datos2Tabla[i];

					if (!datoTemp.id) {
						request.append(datoTemp.name+'-row-'+i, JSON.stringify(datoTemp.value));
					}
				}
			}

			if (this.getEmails.length > 0) {
				swalConfig = {
					title: '¡Enhorabuena!',
					text: 'Ingrese correo electrónico para confirmar registro',
					input: 'email',
					type: 'warning',
					inputPlaceholder: 'Correo electrónico',
					validationMessage: 'Correo electrónico no válido',
					showCancelButton: true,
					confirmButtonText: 'Aceptar',
					showLoaderOnConfirm: true,
					cancelButtonText: 'Cancelar',
				};
			} else {
				swalConfig = {
					title: '¡Enhorabuena!',
					text: '¿Seguro que ingresó los datos correctos?',
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Sí',
					cancelButtonText: 'Aún no',
				};
			}

			Swal.fire(swalConfig).then((result) => {
				if (result.value) {
					request.append('correo_electronico', result.value);

					axios.post(self.formUrl, request, {
						headers: {
						  'Content-Type': 'multipart/form-data'
						}
					})
					.then(function (response) {
						if (response.data.success === true) {
							Swal.fire({
							  title: '¡Registro completo!',
							  text: '¡Formulario guardado con éxito!',
							  type: 'success',
							  confirmButtonColor: '#3085d6',
							  confirmButtonText: 'Aceptar'
							}).then((result) => {
								if (self.colegio.id == 5) {
									window.location.href = response.data.url;
								} else {
									self.sendSave = false;
									self.message = true;
								}
							})
						}
					});
				} else {
					self.sendSave = false;
				}
			});
		},
		add2Tabla: function (elementId) {
			this.datos2Tabla.push({
				name: 'input-'+elementId,
				value: this.temp2Tabla
			});

			this.temp2Tabla = {};
		},
		remove2Tabla: function (index, row) {
			if (row.id) {
				this.tabla2Remove.push(row.id);
			}

			this.datos2Tabla.splice(index, 1);
		},
		getPropertyName: function (campo, tipo = 'campo', opcion = null) {
			if (tipo == 'tabla') {
				return '' + campo.id + '_' + opcion.id;
			}
			return ''+campo.id + ((campo.campos && campo.campos.length) ? '-'+campo.campos[0].id : '');
		},
		getElement4Update: function (property = '') {
			if (property.length > 0 && this.forUpdate) {
				var result = this.forUpdate.filter(function (element) {
                    if (element.campo) {
                        return (''+element.campo.id == property);
                    }
				});

				return (result.length > 0) ? result[0] : false;
			}
		},
		getElements4Update: function (property = '') {
			if (property.length > 0 && this.forUpdate) {
				var result = this.forUpdate.filter(function (element) {
                    if (element.campo) {
                        return ('' + element.campo.id == property);
                    }
				});

				return (result.length > 0) ? result : false;
			}
		},
		openNewtab: function (id) {
			window.open(document.getElementById(id).dataset.url);
		},
		validateEmail: function (email) {
		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(String(email).toLowerCase());
		},
		updateAgeField: function (event, field) {
			var ageField = this.getAgeField(field.id);
			var campo = this.getCampoById(ageField.campo_id);
			var property = this.getPropertyName(campo);
			var today = moment();
			var birthday = moment(event.target.value);

			this.formRequest[property] = today.diff(birthday, 'years');
		},
		getAgeField: function (opcion_id) {
			return this.dateFields.filter(element => {
				return parseInt(element.opcion_id) == parseInt(opcion_id);
			})[0];
		},
		getCampoById: function (id) {
			var campo = [];

			this.formulario.solapas.map(solapa => {
				var temp = solapa.campos.filter(elemento => {
					return elemento.id == id;
				});

				if (temp.length > 0) {
					campo.push(temp[0]);
				}
			});

			return campo ? campo[0] : null;
		},
		getOpcionesAvanzadas: function (campo, clave) {
			if (clave === "longitud") {
				if (campo.hasOwnProperty("opciones_avanzadas") && campo.opciones_avanzadas
					&& campo.opciones_avanzadas.hasOwnProperty(clave) && campo.opciones_avanzadas[clave]) {
					return campo.opciones_avanzadas[clave];
				}

				return 250;
			}

			return "";
		},		
	},
	computed: {
		getOpcion: function () {
			var self = this;

			return this.tiposDatos.filter(function (element) {
				return element.id == self.campo2Add.tipo_dato_id;
			})[0].opciones;
		},
		getEmails: function () {
			return this.formulario.correos_electronicos;
		},
		getAllDateField: function () {
			return this.dateFields.map(element => {
				return parseInt(element.opcion_id);
			});
		}
	},
});
