import Table from './table';
import Alerts from './alerts';
import Inputs from './inputs';
import Buttons from './buttons';
import Form from './form';

function UIComponents(){
    return (
        <div>
            <h3 className="text-3xl font-medium text-gray-700">UI Components</h3>

            <Table />
            <Alerts />
            <Inputs />
            <Buttons />
            <Form />
        </div>
    );

}

export default UIComponents;