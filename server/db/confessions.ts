import connection from './connection.ts'
import { Confession } from '../../models/confessions'

export async function getAllConfessions(): Promise<Confession[]> {
  return connection('confession').select()
}

export async function editConfession(id: number, content: string) {
  await connection('confession')
    .update('confessionContent', content)
    .update('isEdited', 1)
    .where('id', id)
  return connection('confession').select('*').where('id', id)
}
export async function insertConfession(title: string, content: string) {
  const currentDate = new Date()
  await connection('confession').insert([
    { title , confessionContent: content, isEdited: 0, datePosted: currentDate },
  ])
  return connection('confession').select('*')
}
