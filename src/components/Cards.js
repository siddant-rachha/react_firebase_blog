
//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faStar } from '@fortawesome/free-solid-svg-icons'

//bootstrap
import { Card, Col, Row } from 'react-bootstrap';
import { Stack, Button } from "react-bootstrap";

//router
import { Link } from 'react-router-dom';


function Cards({ postLists, deletePostClick, isAuth, uid }) {
    return (
        <>
            {console.log('CARDS COMPONENT.JS RENDERED')}

            < Row xs={1} md={2} lg={3} className="g-4" >
                {
                    postLists.map((post) => (
                        <Col key={post.id}>
                            <Card bg='light'>
                                <Card.Header className="h5">
                                    {post.title.length > 100 ? `${post.title.slice(0, 75)}...` : `${post.title}`}
                                    {post.premium == true && <span className="me-1 text-warning">
                                        {/* <FontAwesomeIcon size="xs" icon={faStar} /> */}
                                        <span className='ms-1' style={{fontSize:"1rem", whiteSpace: "nowrap"}}><em><small>(<FontAwesomeIcon size="xs" icon={faStar} />premium)</small></em></span>
                                    </span>}
                                </Card.Header>
                                <Card.Body>
                                    <div className="d-flex">
                                        <Card.Subtitle style={{ fontSize: "small" }} className="mb-2 text-muted me-auto">@{post.author.name}</Card.Subtitle>
                                        <Card.Subtitle style={{ fontSize: "small" }} className="mb-2 text-muted ms-auto">{post.date}</Card.Subtitle>
                                    </div>
                                    <Card.Text>
                                        {`${post.postText.slice(0, 100)}...`}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Stack direction="horizontal">
                                        <Link to={`/posts/${post.id}`}>
                                            Read More
                                        </Link>
                                        {isAuth && post.author.id === uid && (
                                            <Button onClick={() => deletePostClick(post.id)} variant="outline-danger" className={"ms-auto"}><FontAwesomeIcon size="xs" icon={faTrashCan} /></Button>
                                        )}
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row >
        </>
    )
}

export default Cards