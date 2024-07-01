import { Materia } from "../components/interfaces/Materia";



export class Utils {


    nomeDasMateria(numero: number): Materia {
        let nome: Materia;
        switch (numero) {
            case 1:
                nome = { nome: "ANDROID KOTLIN DEVELOPER", id: 1 };
                break;
            case 2:
                nome = { nome: "DESENVOLVIMENTO CROSS PLATFORM", id: 2 };
                break;
            case 3:
                nome = { nome: "GOVERNANÇA E MELHORES PRÁTICAS EM TI", id: 3 };
                break;
            case 4:
                nome = { nome: "MICROSERVICE AND WEB ENGINEERING", id: 4 };
                break;
            case 5:
                nome = { nome: "NETWORK MANAGEMENT AND MONITORING", id: 5 };
                break;
            case 6:
                nome = { nome: "OPERATING SYSTEM TUNING AND COGNATION", id: 6 };
                break;
            case 7:
                nome = { nome: "PROGRAMMING AND DATABASE MANAGEMENT", id: 7 };
                break;
            default:
                nome = { nome: "Opção inválida", id: 0 };
        }
        return nome;
    }


    nomeTipoProva(numero: number): string {
        let nome: string;
        switch (numero) {
            case 1:
                nome = "CP";
                break;
            case 2:
                nome = "Global";
                break;
             case 3:
                nome = "Sprint";
                break;
            default:
                nome = "Opção inválida";
        }
        return nome;
    }
}