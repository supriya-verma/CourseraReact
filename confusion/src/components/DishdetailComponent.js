import React, { Component }  from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col,  Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function RenderDish({dish}) {
  return (
    <div className="col-sm-12 col-md-5 m-1">
      <Card >
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

function RenderComments({comments}) {
  if (comments != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <h2>Comments</h2>
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
              </li>
            );
          })}
        </ul>
        <CommentForm />
      </div>
    );
  else 
    return (
      <div>
        <CommentForm />
      </div>
    );
}


const DishDetail = (props) => {
  if (props.dish != null)
    return(
      <div className="container">

        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>
        </div>

        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  else
    return(
      <div></div>
    );
}
     
class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
//        this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      isModalOpen: false
    };
  }

  toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
  }

  handleSubmit(values) {
      console.log('Current State is: ' + JSON.stringify(values));
      alert('Current State is: ' + JSON.stringify(values));
      // event.preventDefault();
  }

  render() {
    return(
      <div>
        <Button outline onClick={this.toggleModal}><span className="fa fa-edit"></span> Submit Comment</Button>
      
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody className="m-3">
              <LocalForm onSubmit={this.handleSubmit}>
                  <Row className="form-group">
                    <Label htmlFor="rating">Rating</Label>
                    <Control.select model=".rating" id="rating" name="rating"
                        className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="author">Your Name</Label>
                      <Control.text model=".author" id="author" name="author"
                          placeholder="Your Name"
                          className="form-control"
                          validators={{
                              required, minLength: minLength(3), maxLength: maxLength(15)
                          }}
                      />
                      <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}
                     />
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="message">Comment</Label>
                    <Control.textarea model=".message" id="message" name="message"
                        rows="6"
                        className="form-control" />
                  </Row>
                  <Button type="submit" value="submit" color="primary">Submit</Button>
              </LocalForm>
          </ModalBody>
      </Modal>
    </div>
    )
  }
} 

export default DishDetail;