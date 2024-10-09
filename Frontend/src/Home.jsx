import React from 'react';
import Topo from './Topo';
import Rodape from './Rodape';
import AgendamentoForm from './components/AgendamentoForm';


const App = () => {
  return (
    <div >
      <body>
        <Topo />
        <AgendamentoForm/>
        <Rodape />
      </body></div>
  );
};

export default App;
