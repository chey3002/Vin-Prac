import { bordeSemaforizado } from "@/components/BordeSemaforizado";
import { Button, Input, Tag } from "antd";
import Link from "next/link";
import { SearchOutlined } from "@ant-design/icons";

const setFilter = (filter) => {
    
    return {
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => {
            return (
                <>
                    <Input
                        autoFocus
                        placeholder="Type text here"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => {
                            confirm();
                        }}
                        onBlur={() => {
                            confirm();
                        }}
                    ></Input>
                    <Button
                        onClick={() => {
                            confirm();
                        }}
                        type="primary"
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters();
                        }}
                        type="danger"
                    >
                        Reset
                    </Button>
                </>
            );
        },
        filterIcon: () => {
            return <SearchOutlined />;
        },
        onFilter: filter
    }
}
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
        title: 'id',
        dataIndex: 'id_ep',
        key: 'id_ep',
        render: (text) => <Link href={`/estudiantes_proyectos/${text}`}>
            {text}
        </Link>,
        ...setFilter(
            (value, record) => {
                return record.id_ep.toString().includes(value.toLowerCase());
        
        })
    },
    {
        title: 'Cedula',
        dataIndex: 'cedula',
        key: 'cedula',
        render: (text) => <Link href={`/estudiantes/${text}`}>
            {text}
        </Link>,
        ...setFilter(
            (value, record) => {
                return record.cedula.toLowerCase().includes(value.toLowerCase());

            })

    },

    {
        title: 'Nombre Completo',
        dataIndex: 'nombre_completo',
        key: 'nombre_completo',
        ...setFilter(
            (value, record) => {
                return record.nombre_completo.toLowerCase().includes(value.toLowerCase());

            })
    },
    {
        title: 'Proyecto',
        dataIndex: 'id_proyecto',
        key: 'id_proyecto',
        render: (text) => <Link href={`/proyectos/${text}`}>
            {text}
        </Link>,
        ...setFilter(
            (value, record) => {
                return record.id.toString().includes(value.toLowerCase());

            })

    },
    {
        title: 'Numero de horas de practicas',
        dataIndex: 'numero_de_horas_de_practicas',
        key: 'numero_de_horas_de_practicas',
        ...setFilter(
            (value, record) => {
                return record.numero_de_horas_de_practicas.toString().includes(value.toLowerCase());

            })
    },
    {
        title: 'Docente Tutor',
        dataIndex: 'docente_tutor',
        key: 'docente_tutor',
        ...setFilter(
            (value, record) => {
                return record.docente_tutor.toLowerCase().includes(value.toLowerCase());

            })
    },
    {
        title: 'Instituciones o empresas',
        dataIndex: 'instituciones_o_empresas',
        key: 'instituciones_o_empresas',
        ...setFilter(
            (value, record) => {
                return record.instituciones_o_empresas.toLowerCase().includes(value.toLowerCase());

            })
    },
    {
        title: 'Propuesta en la que va a participar',
        dataIndex: 'propuesta_en_la_que_va_a_participar',
        key: 'propuesta_en_la_que_va_a_participar',
        ...setFilter(
            (value, record) => {
                return record.propuesta_en_la_que_va_a_participar.toLowerCase().includes(value.toLowerCase());

            })
    },
    {
        title: 'Encargado en la empresa',
        dataIndex: 'encargado_en_la_empresa',
        key: 'encargado_en_la_empresa',
        ...setFilter(
            (value, record) => {
                return record.encargado_en_la_empresa.toLowerCase().includes(value.toLowerCase());

            })
    },
    {
        title: 'Tipo de proyecto',
        dataIndex: 'tipo_de_proyecto',
        key: 'tipo_de_proyecto',
        ...setFilter(
            (value, record) => {
                return record.tipo_de_proyecto.toLowerCase().includes(value.toLowerCase());

            })
    },
    {
        title: 'Fecha limite',
        dataIndex: 'fecha_limite',
        key: 'fecha_limite',
        render: (text) => <span style={{ border: bordeSemaforizado(text) }}>{(new Date(Date.parse(text))).toLocaleDateString() }</span>,
        ...setFilter(
            (value, record) => {
                return record.fecha_limite.toLowerCase().includes(value.toLowerCase());

            })
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