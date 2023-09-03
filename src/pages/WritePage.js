import React from 'react'
import Responsive from '../components/common/Responsive'
import TagsBoxContainer from '../components/write/TagBoxContainer'
import EditorContainer from '../containers/write/EditorContainer'
import WriteActionButtonsContainer from '../components/write/WriteActionButtonsContainer'
import { Helmet } from 'react-helmet-async'

function WritePage() {
    return (
        <Responsive>
            <Helmet>
                <title>글 작성하기 - REACTERS</title>
            </Helmet>
            <EditorContainer />
            <TagsBoxContainer />
            <WriteActionButtonsContainer />
        </Responsive>
    )
}

export default WritePage
