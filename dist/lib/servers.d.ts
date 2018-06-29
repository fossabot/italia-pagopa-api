import * as soap from "soap";
import * as FespCdService from "../wsdl-lib/FespCdService/FespCdPortType";
import * as AvvisiDigitaliService from "../wsdl-lib/AvvisiDigitaliService/PPTPort";
export { FespCdService };
export { AvvisiDigitaliService };
/**
 * Creates a server for the FespCD service.
 *
 * This function mostly wraps the `soap.listen(...)` method.
 * @see https://github.com/vpulim/node-soap#soaplistenserver-path-services-wsdl---create-a-new-soap-server-that-listens-on-path-and-provides-services
 *
 * @param server    See soap.listen documentation
 * @param path      See soap.listen documentation
 * @param fespCdHandlers  An object that implements the IFespCdPortTypeSoap interface
 */
export declare function attachFespCdServer(server: any, path: string, fespCdHandlers: FespCdService.IFespCdPortTypeSoap): Promise<soap.Server>;
/**
 * Creates a server for the AvvisiDigitali service.
 *
 * This function mostly wraps the `soap.listen(...)` method.
 * @see https://github.com/vpulim/node-soap#soaplistenserver-path-services-wsdl---create-a-new-soap-server-that-listens-on-path-and-provides-services
 *
 * @param server    See soap.listen documentation
 * @param path      See soap.listen documentation
 * @param fespPspHandlers  An object that implements the IPSPPortSoap interface
 */
export declare function attachAvvisiDigitaliServer(server: any, path: string, avvisiDigitaliHandlers: AvvisiDigitaliService.IPPTPortSoap): Promise<soap.Server>;
