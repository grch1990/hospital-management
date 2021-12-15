<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePacientesTable extends Migration
{
   
    public function up()
    {
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id();
            $table->string('nombres',30);
            $table->string('apellidos',30);
            $table->string('edad',2);
            $table->integer('id_genero');
            $table->integer('cedula');
            $table->text('direccion');
            $table->integer('fuma');
            $table->integer('toma');
            $table->integer('consume_drogas');
            $table->integer('id_patogologia');
            $table->text('des_patologia');
            $table->integer('id_family_patologia');
            $table->text('des_family_pato');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pacientes');
    }
}
