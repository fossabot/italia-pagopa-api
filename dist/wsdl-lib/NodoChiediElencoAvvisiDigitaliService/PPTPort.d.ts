import { date, gYear, int } from "../../lib/wsdl-types";
export interface InodoChiediElencoAvvisiDigitaliInput {
    /** http://ws.pagamenti.telematici.gov/#stText35(minLength,maxLength) */
    identificativoPSP: string;
    /** http://ws.pagamenti.telematici.gov/#stText35(minLength,maxLength) */
    identificativoIntermediarioPSP: string;
    /** http://ws.pagamenti.telematici.gov/#stText35(minLength,maxLength) */
    identificativoCanale: string;
    /** http://ws.pagamenti.telematici.gov/#stText35(minLength,maxLength) */
    codiceFiscaleUtente: string;
    /** http://ws.pagamenti.telematici.gov/#stText35(minLength,maxLength) */
    codiceFiscalePA: string;
    /** http://ws.pagamenti.telematici.gov/#stCodiceServizio(pattern) */
    codiceServizio: string;
    periodoRiferimento: PPTPortTypes.IperiodoRiferimento;
}
export interface InodoChiediElencoAvvisiDigitaliOutput {
    fault: PPTPortTypes.Ifault;
    /** http://ws.pagamenti.telematici.gov/#stEsitoOperazione(length,OK,KO) */
    esitoOperazione: "OK" | "KO";
    elencoAvvisiDigitali: PPTPortTypes.IelencoAvvisiDigitali;
}
export interface IPPTPortSoap {
    nodoChiediElencoAvvisiDigitali: (input: InodoChiediElencoAvvisiDigitaliInput, cb: (err: any | null, result: InodoChiediElencoAvvisiDigitaliOutput, raw: string, soapHeader: {
        [k: string]: any;
    }) => any) => void;
}
export declare namespace PPTPortTypes {
    interface IperiodoRiferimento {
        /** http://ws.pagamenti.telematici.gov/#gYear(undefined) */
        annoDA: gYear;
        /** http://ws.pagamenti.telematici.gov/#gYear(undefined) */
        annoA: gYear;
    }
    interface Ifault {
        /** http://ws.pagamenti.telematici.gov/#string(undefined) */
        faultCode: string;
        /** http://ws.pagamenti.telematici.gov/#string(undefined) */
        faultString: string;
        /** http://ws.pagamenti.telematici.gov/#string(undefined) */
        id: string;
        /** http://ws.pagamenti.telematici.gov/#string(undefined) */
        description: string;
        /** http://ws.pagamenti.telematici.gov/#int(undefined) */
        serial: int;
    }
    interface IavvisoDigitale {
        /** http://ws.pagamenti.telematici.gov/#stCodiceAvviso(pattern) */
        codiceAvviso: string;
        /** http://ws.pagamenti.telematici.gov/#stStatoPagamento(length,00,01,02) */
        statoPagamento: "00" | "01" | "02";
        /** http://ws.pagamenti.telematici.gov/#stISODate() */
        dataScadenzaAvviso: date;
        /** http://ws.pagamenti.telematici.gov/#stImporto(minInclusive,maxInclusive,fractionDigits,totalDigits) */
        importoAvviso: number;
        /** http://ws.pagamenti.telematici.gov/#stText140(minLength,maxLength) */
        descrizionePagamento: string;
    }
    interface IelencoAvvisiDigitali {
        /** http://ws.pagamenti.telematici.gov/#stText35(minLength,maxLength) */
        identificativoDominio: string;
        /** http://ws.pagamenti.telematici.gov/#stElencoCompleto(length,0,1) */
        elencoCompleto: "0" | "1";
        /** http://ws.pagamenti.telematici.gov/#stNumeroAvvisi(pattern) */
        numeroAvvisi: string;
        avvisoDigitale: PPTPortTypes.IavvisoDigitale[];
    }
}
