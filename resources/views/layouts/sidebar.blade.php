<aside class="app-sidebar">
  <div class="app-sidebar__user"><img class="app-sidebar__user-avatar" src="{{ asset('img/profile.png') }}" width="48px" height="48px" alt="User Image">
    <div>
      <p class="app-sidebar__user-name"></p>
    </div>
  </div>

  <ul class="app-menu">
{{--     <li>
    	<a class="app-menu__item" href="index.html">
    		<i class="app-menu__icon fa fa-dashboard"></i><span class="app-menu__label">Dashboard</span>
    	</a>
    </li> --}}
    <li class="treeview">
        <a class="app-menu__item" href="#" data-toggle="treeview">
            <i class="app-menu__icon fa fa-graduation-cap"></i>
            <span class="app-menu__label">Registro</span>
            <i class="treeview-indicator fa fa-angle-right"></i>
        </a>
      <ul class="treeview-menu">
        <li>
            <a class="treeview-item" href="">
                <i class="icon fa fa-circle-o"></i> Registrar Medico
            </a>
        </li>
      </ul>
    </li>
    
    
    <li>
    	<a class="app-menu__item" href="">
    		<i class="app-menu__icon fa fa-book"></i><span class="app-menu__label">Ambulatorio</span>
    	</a>
    </li>
    

    <li>
    	<a class="app-menu__item" href="{{ route('formulario-index') }}">
    		<i class="app-menu__icon fa fa-table"></i><span class="app-menu__label">Medicamentos</span>
    	</a>
    </li>


  </ul>
</aside>