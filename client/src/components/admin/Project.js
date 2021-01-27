import React from "react";
import {
    ArrayField,
    ArrayInput,
    SimpleFormIterator,
    Create,
    Datagrid,
    DateField,
    DateInput,
    DeleteButton,
    Edit,
    EditButton,
    ImageField,
    List,
    required,
    RichTextField,
    Show,
    ShowButton,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
} from "react-admin";


import RichTextInput from "ra-input-rich-text";

export const ProjectList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="teamname" label="Team Name" />
                <DateField source="issuedOn" label="Issued On" />
                <TextField source="status" />
                <ShowButton basePath='/projects' />
                <EditButton basePath="/projects" />
                <DeleteButton basePath="/projects" />
            </Datagrid>
        </List>
    );
};

export const ProjectCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm redirect="/projects">
                <TextInput source="title" label="Project Name" />
                <TextInput source="teamname" label="Team Name" />

                <RichTextInput source="description" label="Description"
                    toolbar={[['bold', 'italic', 'underline', 'strike'],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    ['blockquote', 'code-block'],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'align': [] }],
                    ['image'],
                    ['clean']]} />
                <RichTextInput source="objective" label="Objective"
                    toolbar={[['bold', 'italic', 'underline', 'strike'],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    ['blockquote', 'code-block'],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'align': [] }],
                    ['image'],
                    ['clean']]} />

                <TextInput source="pic" label="Image Link" />
                <TextInput source="status" label="Status" />
                <ArrayInput source="member" label="Members">
                    <SimpleFormIterator >
                        <TextInput source="member" label="Member" />
                    </SimpleFormIterator>
                </ArrayInput>
                <DateInput
                    source="issuedon"
                    label="Issued On"
                    defaultValue={new Date()}
                />
            </SimpleForm>
        </Create>
    );
};

export const ProjectShow = (props) => {
    return (
        <Show {...props} title="Project Show">
            <SimpleShowLayout>
                <TextField source="title" label="Project Name" />
                <RichTextField source="teamname" label="Team Name" />
                <RichTextField source="description" label="Description" />
                <RichTextField source="objective" label="Objective" />

                <ImageField source="pic" label="Image" />
                <TextField source="status" label="Status" />
                {/* <ArrayInput source="member" label="Team Members" /> */}
                <ArrayField source="member" label="Members">
                    <Datagrid>
                        <TextField source="member" />
                    </Datagrid>
                </ArrayField>
                <DateField source="issuedon" label="Issued On" />

            </SimpleShowLayout>
        </Show>
    );
};

export const ProjectEdit = (props) => {
    return (
        <Edit title="Edit Project" {...props}>
            <SimpleForm redirect="/projects">
                <TextInput disabled label="Id" source="id" />
                <TextInput source="title" validate={required()} label="Project Name" />
                <TextInput source="teamname" validate={required()} label="Project Name" />
                <RichTextInput source="description" validate={required()} label="Description"
                    modules={{
                        imageResize: {
                            displaySize: true
                        }
                    }}
                    toolbar={[['bold', 'italic', 'underline', 'strike'],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    ['blockquote', 'code-block'],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'align': [] }],
                    ['link', 'image', 'video'],
                    ['clean']]}
                />
                <RichTextInput source="objective" validate={required()} label="Objective"
                    modules={{
                        imageResize: {
                            displaySize: true
                        }
                    }}
                    toolbar={[['bold', 'italic', 'underline', 'strike'],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    ['blockquote', 'code-block'],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'align': [] }],
                    ['link', 'image', 'video'],
                    ['clean']]}
                />

                <TextInput source="pic" label="Image Link" />
                <TextInput source="status" validate={required()} label="Status" />
                <ArrayField source="member" label="Members">
                    <Datagrid>
                        <TextField source="member" />
                    </Datagrid>
                </ArrayField>
                <DateInput
                    source="issuedon"
                    label="Issued On"
                    validate={required()}
                />
            </SimpleForm>
        </Edit>
    );
};
