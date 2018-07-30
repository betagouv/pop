import React from 'react';
import { Container, Col, Row } from 'reactstrap';

import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';

import AsideIcon from '../../assets/outbox.png';


import './index.css';

export default class StepForm extends React.Component {
    state = {
        step: 1,
        done: [],
        files: {},
        activeNext: true,
    };

    switchSteps() {
        switch (this.state.step) {
            case 1:
                return <StepOne uploadFiles={this.uploadFiles} />;
            case 2:
                return <StepTwo />;
            case 3:
                return <StepThree submitEmail={this.submitEmail} />;
        }
    }

    uploadFiles = (files) => {
        if (files.length > 0) {
            this.doneStep(1);
            this.setState({ files, activeNext: false });
        }
    }

    importFiles = (files) => {
            this.doneStep(2);
            this.setState({ activeNext: false });
    }

    submitEmail = () => {
        this.doneStep(3);
    }

    setStep(step) {
        this.setState({ step });
        this.setState({ activeNext: true });
    }

    doneStep(step) {
        const done = [...this.state.done];
        if (!done.includes(step)) {
            done.push(step);
            this.setState({ done });
        }
    }

    stepProgress() {
        let progressClass = 'steps';

        if (this.state.done.includes(1) && this.state.step === 2) progressClass = 'steps step2';
        if (this.state.done.includes(2) && this.state.step === 3) progressClass = 'steps step3';

        return progressClass;

    }

    render() {
        const { step, done, activeNext } = this.state;

        return (
            <div className="steps-form py-5">
                <Container>
                    <Row noGutters>
                        <aside className="col-md-4 aside d-flex flex-column justify-content-center align-items-center text-center p-5">
                            <div className="mb-5">
                                <img src={AsideIcon} width={100} alt="" />
                            </div>
                            <h5>Plateforme Ouverte du Patrimoine</h5>
                            <p>la plateforme POP regroupe les contenus numerique de patrimoine fancais affin de les rendre accessibles et onsultables au plus grand nombre</p>
                        </aside>
                        <Col md={8} className="text-center p-5 bg-white steps-main">
                            <p className="lead">Cette section vous permet de verser du contenu numerique (notices, images) dans la base joconde, selon les trois etapes suivantes</p>
                            <div className={this.stepProgress()} >
                                <button className={done.includes(1) ? 'step-done' : 'step-active'} onClick={() => this.setStep(1)}>1</button>
                                <button className={done.includes(2) ? 'step-done' : (done.includes(1) && step === 2) ? 'step-active' : 'step'} disabled={done.includes(2) ? false : true} onClick={() => this.setStep(2)}>2</button>
                                <button className={done.includes(3) ? 'step-done' : (done.includes(2) && step === 3) ? 'step-active' : 'step'} disabled={done.includes(3) ? false : true} onClick={() => this.setStep(3)}>3</button>
                            </div>
                            <div className="steps-area">
                                { this.switchSteps() }
                            </div>
                            <div className="button-controls">
                                { step < 3 && <button disabled={activeNext} onClick={() => this.setStep(step + 1)}>Next</button> }
                                { step === 2 && <button onClick={() => this.importFiles(2)} className="btn import">Annuler I’import</button> }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
