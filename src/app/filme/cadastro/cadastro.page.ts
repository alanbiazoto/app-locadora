import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/models/filme.interface';
import { FilmeService } from 'src/app/services/filme.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { AutorPage } from 'src/app/autor/autor.page';
import { Autor } from 'src/app/models/autor.interface';
import { AutorService } from 'src/app/services/autor.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  filme : Filme;
  autores : Autor[];
  autor : Autor;
  

  constructor(
    private autorService: AutorService,
    private filmeService: FilmeService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController:LoadingController

  ) { 
    this.autor = undefined;
    this.listarAutores();
    this.filme = { nome:'',dtlanc: new Date,sinopse:new Text(),img:'',autor: { nome:'',dtnasc: new Date,nacionalidade:'',img:'',obs:null}};

  }

  getListaAutores() {
    return this.autores;
  }

  async listarAutores() {
    const busyLoader = await this.loadingController.create({message:'Carregando..'});
    busyLoader.present();
    this.autores = await this.autorService.getAutores().toPromise();
    busyLoader.dismiss();
  }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    if(id) {
      // Carregar as informações
      
      this.filmeService.getFilme(id).subscribe((filme) => {
        this.filme = filme;
        this.autor = this.autores.find(item => item.id == filme.autor.id);
      });
    } 
  }

  async salvar() {

    this.filmeService
      .salvar(this.filme)
      .subscribe(() => {
        this.navController.navigateForward(['/filme']);
      });
  }

}
