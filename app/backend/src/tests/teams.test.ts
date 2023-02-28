import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da camada model de teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  const teams = [
    {
      id: 1,
      teamName: "Avaí/Kindermann"
    },
    {
      id: 2,
      teamName: "Bahia"
    },
    {
      id: 3,
      teamName: "Botafogo"
    },
  ]

   let chaiHttpResponse: Response;

   beforeEach(async () => {
    sinon
       .stub(Team, "findAll")
      .resolves(
       teams as Team[]);
   });

   afterEach(()=>{
     (Team.findAll as sinon.SinonStub).restore();
   })

   it('Verifica se retorna todos os times com o status 200', async () => {
     chaiHttpResponse = await chai
        .request(app).get('/teams').send(teams);

    expect(chaiHttpResponse).to.deep.equal(teams);
    expect(chaiHttpResponse.status).to.be.equal(200);
   });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true);
  });
});
