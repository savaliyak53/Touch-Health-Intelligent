import React from 'react';

import './index.scss';
import Button from '../../components/Button';

const Verify = () => {

    return (
        <div className="verifyWrap">
            <div className="prompt">
                Enter the verification below to complete SignUp!
            </div>

            <form method="get" className="digit-group" data-group-name="digits" data-autosubmit="false" autoComplete="off">
                <div className="inputGroup">
                    <input type="text" id="digit-1" name="digit-1" data-next="digit-2" maxLength={1} />
                    <input type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" maxLength={1} />
                    <input type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" maxLength={1} />
                    <input type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" maxLength={1} />
                    <input type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" maxLength={1} />
                    <input type="text" id="digit-6" name="digit-6" data-previous="digit-5" maxLength={1} />
                </div>
                <Button
                    size="md"
                    onClick={() => {"button is clicked"}}
                >
                    VERIFY
                </Button>
            </form>
        </div>
    )
};

export default Verify
