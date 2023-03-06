import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import {Card, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Stack, Button } from "react-bootstrap";

function Cards({postLists, deletePostClick, isAuth}) {
    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {postLists.map((post) => (
                <Col key={post.id}>
                    <Card bg='light'>
                        <Card.Header className="h5">
                            {post.title.length > 100 ? `${post.title.slice(0, 75)}...` : `${post.title}`}
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
                                {isAuth && post.author.id === localStorage.authuid && (
                                    <Button onClick={() => deletePostClick(post.id)} variant="outline-danger" className="ms-auto"><FontAwesomeIcon size="xs" icon={faTrashCan} /></Button>
                                )}
                            </Stack>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default Cards