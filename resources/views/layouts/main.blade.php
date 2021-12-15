<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>Hospital Cielo Azul</title>

	<!-- Main CSS-->
	<link rel="stylesheet" type="text/css" href="{{ asset('css/main.css') }}">
	<!-- <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> -->
	<link rel="stylesheet" type="text/css" href="{{ asset('css/font-awesome.min.css') }}">

	@yield('custom_css')
</head>

<body class="app sidebar-mini rtl" data-url="">
	<!-- Navbar-->
	<header class="app-header"><a class="app-header__logo" href="">Principal</a>
	  <!-- Sidebar toggle button-->
	  <a class="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hide Sidebar"></a>

	  <!-- Navbar Right Menu-->
	  <ul class="app-nav">
	    <!-- User Menu-->
	    <li class="dropdown"><a class="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><i class="fa fa-user fa-lg"></i></a>
	      <ul class="dropdown-menu settings-menu dropdown-menu-right">
	        	 <li><a class="dropdown-item" href=""><i class="fa fa-user fa-lg"></i> Perfil</a></li> 
	        <li><a class="dropdown-item" href=""><i class="fa fa-sign-out fa-lg"></i> Salir</a></li>
	      </ul>
	    </li>
	  </ul>
	</header>

	<aside class="app-sidebar">
  <div class="app-sidebar__user"><img class="app-sidebar__user-avatar" src="{{ asset('img/profile.png') }}" width="48px" height="48px" alt="User Image">
    <div>
      <p class="app-sidebar__user-name"></p>
    </div>
  </div>

  <ul class="app-menu">
    <li>
    	<a class="app-menu__item" href="index.html">
    		<i class="app-menu__icon fa fa-dashboard"></i><span class="app-menu__label">Dashboard</span>
    	</a>
    </li> 
    <li class="treeview">
        <a class="app-menu__item" href="#" data-toggle="treeview">
            <i class="app-menu__icon fa fa-graduation-cap"></i>
            <span class="app-menu__label">Modulo</span>
            <i class="treeview-indicator fa fa-angle-right"></i>
        </a>
      <ul class="treeview-menu">
        <li>
            <a class="treeview-item" href="{{route('medico.index')}}">
                <i class="icon fa fa-circle-o"></i> Lista de Medicos
            </a>
            <a class="treeview-item" href="{{route('medico.insertar')}}">
                <i class="icon fa fa-circle-o"></i> Ejemplo
            </a>
        </li>
      </ul>
    </li>
     
    <li>
    	<a class="app-menu__item" href="{{route('medicamentos.index')}}">
    		<i class="app-menu__icon fa fa-table"></i><span class="app-menu__label">Medicamentos</span>
    	</a>
    </li>

     <li>
    	<a class="app-menu__item" href="{{ route('paciente.create') }}">
    		<i class="app-menu__icon fa fa-table"></i><span class="app-menu__label">Pacientes</span>
    	</a>
    </li>

  </ul>
</aside>

	@yield('content')
	
	<!-- Essential javascripts for application to work-->
	<!-- <script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script> -->
	<script src="{{ asset('js/jquery.min.js') }}"></script>
	<!-- <script src="https://cdn.jsdelivr.net/npm/popper.js@1.15.0/dist/umd/popper.min.js"></script> -->
	<script src="{{ asset('js/popper.min.js') }}"></script>
	<!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" crossorigin="anonymous"></script> -->
	<script src="{{ asset('js/bootstrap.min.js') }}"></script>
	<!-- The javascript plugin to display page loading on top-->
	<script src="{{ asset('js/plugins/pace.min.js') }}"></script>
	<script src="{{ asset('js/main.js') }}"></script>

	@yield('custom_js')

</body>
</html>