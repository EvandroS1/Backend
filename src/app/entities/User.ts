import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity('cadastros')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar', { length: 100, nullable: false})
  nome_Cliente: string;

  @Column('varchar', {length: 100, nullable: false})
  senha: string;
  
  @Column('varchar', {length: 100, nullable: false})
  nome_Empresa: string;
  
  @Column('varchar', {length: 100, nullable: false})
  cnpj: string;
  
  @Column('varchar', {length: 100, nullable: false})
  cep: string;
  
  @Column('varchar', {length: 100, nullable: false})
  endereco: string;
  
  @Column('varchar', {length: 100, nullable: false})
  numero: string;
  
  @Column('varchar', {length: 100, nullable: false})
  telefone: string;
  
  @Column('varchar', { length: 100, nullable: false})
  email: string;
}
export default User;