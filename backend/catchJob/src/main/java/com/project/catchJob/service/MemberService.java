package com.project.catchJob.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.catchJob.domain.Member;
import com.project.catchJob.repository.MemberRepository;
import com.project.catchJob.security.PasswordEncoder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MemberService {
	
	@Autowired
	private MemberRepository memberRepo;
	
	// ȸ������
	public Member createMember(Member member) {
		if(member == null || member.getEmail() == null) {
			throw new RuntimeException("���� �Է��Ͽ����ϴ�!");
		}
		final String email =  member.getEmail();
		if(memberRepo.existsByEmail(email)) {
			log.warn("{} �ش� �̸����� �̹� �����մϴ�!", email);
			throw new RuntimeException("�̹� �����ϴ� �̸����Դϴ�!");
		}
		return memberRepo.save(member);
	}
	
	// �α���
	public Member getByCredentials(final String email, final String pwd, final PasswordEncoder pwdEncoder) {
		
		final Member originMember = memberRepo.findByEmail(email);
		// matches �޼��带 �̿��ؼ� �н����� ������ Ȯ��
		if(originMember != null && pwdEncoder.matches(pwdEncoder.encrypt(email, pwd), originMember.getPwd())) {
			return originMember;
		}
		return null;
	}
	
	// ȸ������
	public Member updateMember(Member member) {
		
		Member findMember = memberRepo.findByEmail(member.getEmail());
		
		if(findMember != null) {
			// ������ ��¿��θ� ���� ����
			findMember.setJob(member.getJob());
			findMember.setHasCareer(member.getHasCareer());
			
			return memberRepo.save(findMember);
		} else {
			throw new RuntimeException("�ٽ� �α��� ���ּ���");
		}
	}

}
