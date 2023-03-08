import { bordeSemaforizado } from "@/components/BordeSemaforizado";
import { Tag } from "antd";
import Link from "next/link";

export const estudiantesColumns = [
    {
        title: 'Cedula 🔗',
        dataIndex: 'cedula',
        key: 'cedula',
        render: (text) => <Link href={`/estudiantes/${text}`}>
            {text}
        </Link>,

    },
    {
        title: 'Ciclo',
        dataIndex: 'ciclo',
        key: 'ciclo',
    },
    {
        title: 'Nombre Completo',
        dataIndex: 'nombre_completo',
        key: 'nombre_completo',
    },
    {
        title: 'Unidad académica',
        dataIndex: 'unidad_academica',
        key: 'unidad_academica',
    },
];
export const proyectosColumns = [
    {
        title: 'Id 🔗',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <Link href={`/proyectos/${text}`}>
            {text}
        </Link>,

    },
    {
        title: 'Catedra integradora',
        dataIndex: 'catedra_integradora',
        key: 'catedra_integradora',
    },
    {
        title: 'Proyecto integrador',
        dataIndex: 'proyecto_integrador',
        key: 'proyecto_integrador',
    },
    {
        title: 'Proyecto servicio comunitario',
        dataIndex: 'proyecto_servicio_comunitario',
        key: 'proyecto_servicio_comunitario',
    },
    {
        title: 'Numero de horas de practicas',
        dataIndex: 'numero_de_horas_de_practicas',
        key: 'numero_de_horas_de_practicas',
    },
    {
        title: 'Numero de estudiantes que deben hacer las practicas',
        dataIndex: 'numero_de_estudiantes_que_deben_hacer_las_practicas',
        key: 'numero_de_estudiantes_que_deben_hacer_las_practicas',
    },
    {
        title: 'Actividades a realizar',
        dataIndex: 'actividades_a_realizar',
        key: 'actividades_a_realizar',
    },
    {
        title: 'Docente Tutor',
        dataIndex: 'docente_tutor',
        key: 'docente_tutor',
    },
    {
        title: 'Instituciones o empresas',
        dataIndex: 'instituciones_o_empresas',
        key: 'instituciones_o_empresas',
    },
    {
        title: 'Propuesta en la que va a participar',
        dataIndex: 'propuesta_en_la_que_va_a_participar',
        key: 'propuesta_en_la_que_va_a_participar',
    },
    {
        title: 'Encargado en la empresa',
        dataIndex: 'encargado_en_la_empresa',
        key: 'encargado_en_la_empresa',
    },
    {
        title: 'Tipo de proyecto',
        dataIndex: 'tipo_de_proyecto',
        key: 'tipo_de_proyecto',
    },
];
export const estudiantesProyectosColumns = [
    {
        title: 'id 🔗',
        dataIndex: 'id_ep',
        key: 'id_ep',
        render: (text) => <Link href={`/estudiantes_proyectos/${text}`}>
            {text}
        </Link>,

    },
    {
        title: 'Cedula 🔗',
        dataIndex: 'cedula',
        key: 'cedula',
        render: (text) => <Link href={`/estudiantes/${text}`}>
            {text}
        </Link>,

    },

    {
        title: 'Nombre Completo',
        dataIndex: 'nombre_completo',
        key: 'nombre_completo',
    },
    {
        title: 'Proyecto 🔗',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <Link href={`/proyectos/${text}`}>
            {text}
        </Link>,

    },
    {
        title: 'Numero de horas de practicas',
        dataIndex: 'numero_de_horas_de_practicas',
        key: 'numero_de_horas_de_practicas',
    },
    {
        title: 'Actividades a realizar',
        dataIndex: 'actividades_a_realizar',
        key: 'actividades_a_realizar',
    },
    {
        title: 'Docente Tutor',
        dataIndex: 'docente_tutor',
        key: 'docente_tutor',
    },
    {
        title: 'Instituciones o empresas',
        dataIndex: 'instituciones_o_empresas',
        key: 'instituciones_o_empresas',
    },
    {
        title: 'Propuesta en la que va a participar',
        dataIndex: 'propuesta_en_la_que_va_a_participar',
        key: 'propuesta_en_la_que_va_a_participar',
    },
    {
        title: 'Encargado en la empresa',
        dataIndex: 'encargado_en_la_empresa',
        key: 'encargado_en_la_empresa',
    },
    {
        title: 'Tipo de proyecto',
        dataIndex: 'tipo_de_proyecto',
        key: 'tipo_de_proyecto',
    },
    {
        title: 'Fecha limite',
        dataIndex: 'fecha_limite',
        key: 'fecha_limite',
        render: (text) => <span style={{ border: bordeSemaforizado(text) }}>{(new Date(Date.parse(text))).toLocaleString() }</span>,
        
    },
    {
        title: "Estado",
        dataIndex: "fecha_limite",
        key: "estado",
        render: (text) => {
            const { tag, color } = bordeSemaforizado(text)
            
            return (
                <Tag color={color} >
                    {tag.toUpperCase()}
                </Tag>
            )
        }
        

    }
];