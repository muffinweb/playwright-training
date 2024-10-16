/**
 * This package converts Seareate response data to more convenient structure.
 * 
 * @package Searate Parser
 * @author Ugur Cengiz <ugurcengiz.mail@icloud.com>
 */

export default class SearateParser {
    constructor() {
        // String JSON Data
        this.rawResponse = '';

        // Jsonified Response Data
        this.response;

        this.jsonParsedSuccessfully = false;
    }

    /**
     * Loads Raw Response
     * 
     * @param {*} rawStr 
     */
    loadRawResponse(rawStr) {
        this.rawResponse = rawStr;

        return this;
    }


    /**
     * Parses Raw Data to JSON Object
     */
    toJson() {
        this.jsonParsedSuccessfully = false;

        if (typeof this.rawResponse == 'string') {
            if (this.rawResponse.length > 0) {
                this.response = JSON.parse(this.rawResponse);
                this.jsonParsedSuccessfully = true;
            }
        }

        if (!this.jsonParsedSuccessfully)
            throw new Error("Parse process could not be done")

        return this;
    }

    /**
     * Validates json data if it's ok
     */
    validate() {
        if (this.response?.status == 'success') {
            return this;
        } else {
            throw new Error("Validation failed")
        }
    }

    prepareDataStructure() {

        let preInformation = {
            locations: [],
            vessels: []
        }

        let prePayload = {
            containers: [],
            movements: []
        }

        // Location/Port 
        this.response.data.locations.forEach(location => {
            preInformation.locations[location.id] = location;
        })

        //Vessels
        this.response.data.vessels.forEach(vessel => {
            preInformation.vessels[vessel.id] = vessel;
        })

        //Containers
        this.response.data.containers.forEach(container => {
            prePayload.containers.push({
                number: container.number,
                size_type: container.size_type,
                status: container.status
            })
        })

        // Main Container Index | TODO: This will be dynamic
        const mainContainerIndex = 0;

        // Movements (Main Container Number should be already specified before this action)
        this.response.data.containers[mainContainerIndex].events.forEach(event => {
            prePayload.movements.push({
                location: preInformation.locations[event.location],
                description: event.description,
                event_type: event.event_type,
                event_code: event.event_code,
                date: event.date,
                isActual: event.actual,
                type: event.type,
                transport_type: event.transport_type,
                vessel: preInformation.vessels[event.vessel],
                voyage: event.voyage
            });
        });

        return prePayload;
    }


}