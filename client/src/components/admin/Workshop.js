import React from "react";
import {
    Create,
    Datagrid,
    DateField,
    DateInput,
    DeleteButton,
    Edit,
    EditButton,
    List,
    required,
    RichTextField,
    Show,
    ShowButton,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
    UrlField,
} from "react-admin";

import RichTextInput from "ra-input-rich-text";

export const WorkshopList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <DateField source="date" label="Date" />
                <ShowButton basePath='/workshop' />
                <EditButton basePath="/workshop" />
                <DeleteButton basePath="/workshop" />
            </Datagrid>
        </List>
    );
};

export const WorkshopCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm redirect="/workshop">
                <TextInput source="name" label="Name" />
                <TextInput source="brochure" label="Brochure Link" />
                <RichTextInput source="about" label="About"
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
                <DateInput
                    source="date"
                    label="Date"
                    defaultValue={new Date()}
                />
            </SimpleForm>
        </Create>
    );
};

export const WorkshopShow = (props) => {
    return (
        <Show {...props} title="Workshop Show">
            <SimpleShowLayout>
                <TextField source="name" label="Name" />
                <UrlField source="brochure" label="Brochure Link" />
                <RichTextField source="about" label="About" />
                <DateField source="date" label="date" />
            </SimpleShowLayout>
        </Show>
    );
};

export const WorkshopEdit = (props) => {
    return (
        <Edit title="Edit Workshop" {...props}>
            <SimpleForm redirect="/workshop">
                <TextInput disabled label="Id" source="id" />
                <TextInput source="name" validate={required()} label="Name" />
                <TextInput source="brochure" validate={required()} label="brochure link" />
                <RichTextInput source="about" label="About" validate={required()}
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
                <DateInput
                    source="date"
                    label="Date"
                    validate={required()}
                />
            </SimpleForm>
        </Edit>
    );
};