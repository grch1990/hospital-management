<?php
use App\Http\Controllers\HospitalController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/index',[HospitalController::class,'index']);
Route::get('medicos/create',[HospitalController::class,'create']);
Route::post('medicos/store',[HospitalController::class,'store'])->name('medicos.store');
Route::get('/medicos/show',[HospitalController::class,'show'])->name('medicos.listas');
Route::get('list',[HospitalController::class,'list'])->name('list');
Route::get('medicos/{id}/edit',[HospitalController::class,'edit']);



