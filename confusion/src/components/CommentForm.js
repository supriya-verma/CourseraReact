import React, { Component } from 'react';
import { Button, FormGroup, Label, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
 class CommentForm extends Component {
    constructor(props) {
        super(props);
         this.state = {
            rating: '',
            name: '',
            comment: '',
            touched: {
                rating: false,
                name: false,
                comment: false
            },
            isModalOpen: false
        };
         this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
     }
     toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
     validate(name) {
         const errors = {
            name: '',
        };
         if (this.state.touched.name && name.length < 3)
            errors.name = 'First Name should be >= 3 characters';
        else if (this.state.touched.name && name.length > 16)
            errors.name = 'First Name should be <= 15 characters';
        return errors;
    }
     handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }
     handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
         this.setState({
            [name]: value
        });
    }
     handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(event));
        alert('Current State is: ' + JSON.stringify(event));       
    }
     render() {
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        return (
            <div className="container">
                <div className="row">
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group"> 
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        placeholder=""
                                        className="form-control">
                                        <option>1 </option>     
                                        <option>2</option>  
                                        <option>3</option>  
                                        <option>4</option>  
                                        <option>5</option>  
                               </Control.select>   
                                     
                                </Col>
                                </Row>
                        <Row className="form-group">   
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder=""
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: ' Must be greater than 2 characters',
                                            maxLength: ' Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                                </Row>
                        <Row className="form-group">   
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows={6}
                                        placeholder=""
                                        className="form-control"
                                    />
                                </Col>
                                </Row>
                        <Row className="form-group">   
                                <Col md={{ size: 12 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
 export default CommentForm