import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProdutoEntity } from "./produto.entity";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) {}

    async criar(produto: ProdutoEntity) {
        const produtoSalvo = await this.produtoRepository.save(produto);
        return produtoSalvo
    }

    async listar() {
        const produtos = await this.produtoRepository.find();
        const listaProdutos = produtos.map(p => new ListaProdutoDTO(p.id, p.nome))
        return listaProdutos
    }

    async atualizar(id: string, novosDados: AtualizaProdutoDTO) {
        const produtoAtualizado = await this.produtoRepository.update(id, novosDados);
        return produtoAtualizado
    }

    async deletar(id: string) {
        const produtoRemovido = await this.produtoRepository.delete(id);
        return produtoRemovido
    }
}