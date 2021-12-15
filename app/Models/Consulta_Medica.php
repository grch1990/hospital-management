<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consulta_Medica extends Model
{
    use HasFactory;
    protected $table = "consultas_medicas";
    protected $fillable = ['cedula','sintomas','observaciones'];
}
