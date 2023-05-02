<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;



Route::get('/', [TodoController::class, 'index'])->name('todos.index');
Route::post('/store', [TodoController::class, 'store'])->name('todos.store');
Route::post('/update/{id}', [TodoController::class, 'update'])->name('todos.update');
Route::post('/delete/{id}', [TodoController::class, 'destroy'])->name('todos.destroy');