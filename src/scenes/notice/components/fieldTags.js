import React from 'react';
import { Field } from 'redux-form'
import ReactTags from 'react-tag-input'

const Tags = ReactTags.WithContext;

class TagsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: suggestions,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    handleDelete(i) {
        const arr = this.props.input.value;
        const newArr = arr.filter((tag, index) => index !== i);
        this.props.input.onChange(newArr);
    }

    handleAddition(tag) {
        const arr = this.props.input.value;
        const newArr = arr.concat(tag.text);
        this.props.input.onChange(newArr);
    }

    handleTagClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    render() {


        console.log('DDDSQDS',this.props.input.value)
        return (
            <div>
                <Tags
                    tags={this.props.input.value ? this.props.input.value.map(e => { return { id: e, text: e } }) : []}
                    suggestions={this.state.suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                />
            </div>
        );
    }
}

const makeField = ({ ...rest }) => {
    return (
        <TagsInput  {...rest} />
    );
}

export default ({ title, ...rest }) => {
    return (
        <div style={styles.container}>
            {title && <strong style={styles.title} >{title}</strong>}
            <Field component={makeField} {...rest} />
        </div>
    )
};


const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    title: {
        paddingRight: '15px',
        whiteSpace: 'nowrap',
        minWidth: '100px'
    }
}



// Set up test data
const Countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua &amp; Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia &amp; Herzegovina',
    'Botswana',
    'Brazil',
    'British Virgin Islands',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Cape Verde',
    'Cayman Islands',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Congo',
    'Cook Islands',
    'Costa Rica',
    'Cote D Ivoire',
    'Croatia',
    'Cruise Ship',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Polynesia',
    'French West Indies',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kuwait',
    'Kyrgyz Republic',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macau',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Pierre &amp; Miquelon',
    'Samoa',
    'San Marino',
    'Satellite',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'South Africa',
    'South Korea',
    'Spain',
    'Sri Lanka',
    'St Kitts &amp; Nevis',
    'St Lucia',
    'St Vincent',
    'St. Lucia',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    "Timor L'Este",
    'Togo',
    'Tonga',
    'Trinidad &amp; Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks &amp; Caicos',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Venezuela',
    'Vietnam',
    'Virgin Islands (US)',
    'Yemen',
    'Zambia',
    'Zimbabwe',
];


const suggestions = Countries.map((country) => {
    return {
        id: country,
        text: country
    }
})