import React from 'react'
import Responsive from '../components/common/Responsive'
import TagsBoxContainer from '../components/write/TagBoxContainer'
import EditorContainer from '../containers/write/EditorContainer'
import WriteActionButtonsContainer from '../components/write/WriteActionButtonsContainer'

function WritePage() {
    return (
        <Responsive>
            <EditorContainer />
            <TagsBoxContainer />
            <WriteActionButtonsContainer />
        </Responsive>
    )
}

export default WritePage
