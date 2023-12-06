import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1701281071975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cadastros',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'nome_Cliente',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'senha',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'nome_Empresa',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'cnpj',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'endereco',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'numero',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
