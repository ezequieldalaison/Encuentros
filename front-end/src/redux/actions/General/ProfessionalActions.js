import * as Types from "../ActionTypes";
import * as ProfessionalApi from "../../../api/General/ProfessionalApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getProfessionalsSuccess(professionals) {
  return { type: Types.GET_PROFESSIONALS_SUCCESS, professionals };
}

export function getProfessionalsByAreaSuccess(professionals) {
  return { type: Types.GET_PROFESSIONALS_BY_AREA_SUCCESS, professionals };
}

export function searchProfessionalsSuccess(professionals) {
  return { type: Types.SEARCH_PROFESSIONALS_SUCCESS, professionals };
}

export function getProfessionalSuccess(professional) {
  return { type: Types.GET_PROFESSIONAL_SUCCESS, professional };
}

export function createProfessionalSuccess(professional) {
  return { type: Types.CREATE_PROFESSIONALS_SUCCESS, professional };
}

export function updateProfessionalSuccess(professional) {
  return { type: Types.UPDATE_PROFESSIONALS_SUCCESS, professional };
}

export function inactivateProfessionalSuccess(professional) {
  return { type: Types.INACTIVATE_PROFESSIONAL_SUCCESS, professional };
}

export function activateProfessionalSuccess(professional) {
  return { type: Types.ACTIVATE_PROFESSIONAL_SUCCESS, professional };
}

export function getProfessionals() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalApi.getProfessionals()
      .then(professionals => {
        dispatch(getProfessionalsSuccess(professionals));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getProfessional(professionalId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalApi.getProfessional(professionalId)
      .then(professional => {
        dispatch(getProfessionalSuccess(professional));
        return professional;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getProfessionalsByArea(areaId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalApi.getProfessionalsByArea(areaId)
      .then(professional => {
        dispatch(getProfessionalsByAreaSuccess(professional));
        return professional;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveProfessional(professional) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalApi.saveProfessional(professional)
      .then(savedProfessional => {
        professional.id
          ? dispatch(updateProfessionalSuccess(savedProfessional))
          : dispatch(createProfessionalSuccess(savedProfessional));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function inactivateProfessional(professionalId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalApi.inactivateProfessional(professionalId)
      .then(professional => {
        dispatch(inactivateProfessionalSuccess(professional));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function activateProfessional(professionalId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalApi.activateProfessional(professionalId)
      .then(professional => {
        dispatch(activateProfessionalSuccess(professional));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function searchProfessionals(criteria) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalApi.searchProfessionals(criteria)
      .then(professionals => {
        dispatch(searchProfessionalsSuccess(professionals));
        return professionals;
      })
      .catch(error => {
        throw error;
      });
  };
}
