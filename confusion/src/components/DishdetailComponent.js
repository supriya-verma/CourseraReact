import React,  { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem ,
     ModalBody, ModalHeader, Modal, Col, Label, FormGroup, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state={          
            isModelOpen: false
        };
      
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     }
   
     toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

     handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(event));
        alert('Current State is: ' + JSON.stringify(event));       
    }

     render() {      
        return (
            <div className="container">
                <div className="row">
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup row>
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
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                             minLength: minLength(3),
                                              maxLength: maxLength(15)
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
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows={6}
                                        placeholder=""
                                        className="form-control"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 12 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
   function RenderComments({comments}) {

        if (comments == null) {
            return (<div></div>)
        }

        const dishComment = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            )
        })

        return (
            <div>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {dishComment}
                </ul>
              
            </div>
        )
    }

   function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name} </CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    const DishDetail = (props) => {
        const dish = props.dish

        if (dish == null) {
            return (<div></div>)
        }

        return (
            <div className='container'>
             <div className="row">
                <Breadcrumb>
                     <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                 </Breadcrumb>  
        <div className="col-12">
        <h3>{props.dish.name}</h3><hr/>
         </div>
         </div>

             <div className='row'>
             <div className='col-12 col-md-5 m-1'> 
              <RenderDish dish={props.dish}/>
             </div>
             <div className='col-12 col-md-5 m-1'>
             <RenderComments comments={props.comments}/>
             <CommentForm/>
             </div>            
             </div>
            </div>
        )
    }


export default DishDetail
