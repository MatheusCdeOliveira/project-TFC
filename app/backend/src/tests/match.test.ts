import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/MatchModel';
import { allMatches } from './mocks/matchMock';
// import { allMatches } from './mocks/matchMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da camada model de Match', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

   let chaiHttpResponse: Response;

   beforeEach(async () => {
    sinon
       .stub(Match, "findAll")
      .resolves(allMatches as unknown as Match[]);
   });

   afterEach(()=>{
     (Match.findAll as sinon.SinonStub).restore();
   })

   it('Verifica se retorna todos as partidas com o status 200', async () => {
     chaiHttpResponse = await chai
        .request(app).get('/matches');

    expect(chaiHttpResponse.body).to.deep.equal(allMatches);
    expect(chaiHttpResponse.status).to.be.equal(200);
   });
});
