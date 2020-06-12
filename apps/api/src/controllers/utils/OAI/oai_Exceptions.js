let xml = require('xml')

const baseUrl = "https://api.pop.culture.gouv.fr/oai"

/**
 * The OAI codes returned in exceptions.
 */
const EXCEPTION_CODES = {
    BAD_ARGUMENT: "badArgument",
    BAD_RESUMPTION_TOKEN: "badResumptionToken",
    BAD_VERB: "badVerb",
    Bad_ARGUMENTS_WITH_TOKEN: "badArgumentsWithToken",
    CANNOT_DISSEMINATE_FORMAT: "cannotDisseminateFormat",
    ID_DOES_NOT_EXIST: "idDoesNotExist",
    NO_RECORDS_MATCH: "noRecordsMatch",
    NO_RECORD_FOUND: "noRecordsFound",
    NO_METADATA_FORMATS: "noMetadataFormats",
    NO_SET_HIERARCHY: "noSetHierarchy",
    UNKNOWN_CODE: "unknown code"
}

/**
 * Messages returned in OAI exception responses.
 */
const ExceptionMessages = {

    BAD_ARGUMENT: 'The request includes illegal arguments, is missing required arguments, includes a repeated argument, or values for arguments have an illegal syntax.',
    BAD_RESUMPTION_TOKEN: 'The resumption token is invalid',
    BAD_VERB: 'Value of the verb argument is not a legal OAI-PMH verb, the verb argument is missing or the verb argument is repeated.',
    Bad_ARGUMENTS_WITH_TOKEN: 'Just argument "verb" must be present with "resumptionToken".',
    ID_DOES_NOT_EXIST: 'The value of the identifier argument is unknown or illegal in this repository.',
    CANNOT_DISSEMINATE_FORMAT: 'The metadata format identified by the value given for the metadataPrefix argument is not supported by the item or by the repository.',
    NO_RECORDS_MATCH: 'The combination of the values of the from, until, set and metadataPrefix arguments results in an empty list.',
    NO_RECORD_FOUND: 'There are no record with the reference provided.',
    NO_METADATA_FORMATS: 'the metadata format is not  available',
    NO_SET_HEIRARCHY: 'Set is incorrect',
    UNKNOWN_CODE: 'unknown'
}


/** 
* Maps OAI error codes to the corresponding error message.
* @param {EXCEPTION_CODES} code
* @returns {string}
*/
function getExceptionMessage(code){
   switch(code) {
       case EXCEPTION_CODES.BAD_ARGUMENT: {
          return ExceptionMessages.BAD_ARGUMENT;
       }
       case EXCEPTION_CODES.BAD_RESUMPTION_TOKEN: {
           return ExceptionMessages.BAD_RESUMPTION_TOKEN;
       }
       case EXCEPTION_CODES.BAD_VERB: {
           return ExceptionMessages.BAD_VERB;
       }
       case EXCEPTION_CODES.Bad_ARGUMENTS_WITH_TOKEN: {
           return ExceptionMessages.Bad_ARGUMENTS_WITH_TOKEN;
       }
       case EXCEPTION_CODES.ID_DOES_NOT_EXIST: {
           return ExceptionMessages.ID_DOES_NOT_EXIST;
       }
       case EXCEPTION_CODES.ID_DOES_NOT_EXIST: {
        return ExceptionMessages.ID_DOES_NOT_EXIST;
    }
       case EXCEPTION_CODES.NO_RECORDS_MATCH: {
           return ExceptionMessages.NO_RECORDS_MATCH;
       }
       case EXCEPTION_CODES.NO_RECORD_FOUND: {
           return ExceptionMessages.NO_RECORD_FOUND;
       }
       case EXCEPTION_CODES.NO_METADATA_FORMATS: {
           return ExceptionMessages.NO_METADATA_FORMATS;
       }
       case EXCEPTION_CODES.NO_SET_HIERARCHY: {
           return ExceptionMessages.NO_SET_HEIRARCHY;
       }
       default: {
           return ExceptionMessages.UNKNOWN_CODE;
       }

   }
}

/**
 * Generates an OAI exception in xml.
 * @param {ExceptionParams} exception
 * @param {EXCEPTION_CODES} code
 * @returns {string | NodeJS.ReadableStream}
 */
function generateException(queryContent,code) {
    if (code === undefined) {
        throw new Error(`Function arguments are missing:  code: ${code}`);
    }
    if (getExceptionMessage(code) === ExceptionMessages.UNKNOWN_CODE) {
        throw new Error(`Unknown exception type: ${code}`);
    }
    const newException =  {
        'OAI-PMH': [
            {
                _attr:
                    {
                        xmlns: "http://www.openarchives.org/OAI/2.0/",
                        'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
                        'xmlns:dc': "http://purl.org/dc/elements/1.1/",
                        'xsi:schemaLocation': "http://www.openarchives.org/OAI/2.0/" + "\nhttp://www.openarchives.org/OAI/2.0OAI-PMH.xsd"
                    }
            },
            {responseDate: new Date().toISOString()},
        ]
    }

    if (queryContent.verb && queryContent.identifier && queryContent.metadataPrefix) {
        newException['OAI-PMH'].push({
            request: [
                {
                    _attr:
                        {
                            verb: queryContent.verb,
                            identifier: queryContent.identifier,
                            metadataPrefix: queryContent.metadataPrefix
                        }
                },
                baseUrl
            ]
        });
    }
    else if (queryContent.verb && queryContent.identifier) {
        newException['OAI-PMH'].push({
            request: [
                {
                    _attr: {
                        verb: queryContent.verb,
                        identifier: queryContent.identifier
                    }
                },
                baseUrl
            ]
        });
    } else if (queryContent.verb) {
        newException['OAI-PMH'].push(
            {
                request: [
                    {
                        _attr:
                            {verb: queryContent.verb}
                    },
                    baseUrl
                ]
            });
    } else {
        newException['OAI-PMH'].push({request: [{_attr: queryContent }, baseUrl]});
    }
    newException['OAI-PMH'].push({error: [{_attr: {code}}, getExceptionMessage(code)]});

    return xml(newException, {declaration: true});
}

module.exports = {
    EXCEPTION_CODES,
    getExceptionMessage,
    generateException
}