export class UserMessages {
  // Success Messages
  static readonly SUCCESS_RECORD_CREATED = 'Registro criado com sucesso.';
  static readonly SUCCESS_RECORD_UPDATED = 'Registro atualizado com sucesso.';
  static readonly SUCCESS_RECORD_DELETED = 'Registro excluído com sucesso.';

  // Error Messages
  static readonly ERROR_VALIDATION = 'Erro de validação: Por favor, verifique sua entrada.';
  static readonly ERROR_AUTHENTICATION = 'Erro de autenticação: Por favor, faça login.';
  static readonly ERROR_AUTHORIZATION = 'Erro de autorização: Você não tem permissão.';
  static readonly ERROR_CONFLICT = 'Erro de conflito: Há um conflito com o estado atual do recurso.';

  static readonly ERROR_NOT_FOUND = 'Erro de não encontrado: O recurso solicitado não foi encontrado.';
  static readonly ERROR_INTERNAL_SERVER = 'Erro interno do servidor: Por favor, recarregue a página ou entre em contato com o administrador.';
  static readonly ERROR_SERVICE_UNAVAILABLE = 'Serviço indisponível: Por favor, recarregue a página ou entre em contato com o administrador.';
  static readonly ERROR_UNKNOWN = 'Erro desconhecido: Por favor, recarregue a página ou entre em contato com o administrador.';

  static readonly ERROR_SUPPORT_MESSAGE = 'Aparece que houve um problema...'

  // Informational Messages
  static readonly INFO_NO_RESULTS = 'Nenhum resultado encontrado.';
  static readonly INFO_NO_RECORDS = 'Parece que não há nenhum registro.';

  // Warning Messages

  // Confirmation Messages
  static readonly CONFIRM_UPDATE = 'Você realmente deseja atualizar este item? Esta ação não pode ser desfeita.';
  static readonly CONFIRM_DELETE = 'Você realmente deseja excluir este item? Esta ação não pode ser desfeita.';
}
